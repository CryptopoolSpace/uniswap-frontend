import React, { useState, useEffect } from 'react'
import { useWeb3Context } from 'web3-react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useArbTokenBridge, TokenType } from 'arb-token-bridge'
import { ethers } from 'ethers'
import { lighten, darken } from 'polished'
import Tooltip from '@reach/tooltip'
import '@reach/tooltip/styles.css'

import Circle from '../../assets/images/circle.svg'
import { ReactComponent as QuestionMark } from '../../assets/images/question.svg'
import { Button, Spinner } from '../../theme'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import OversizedPanel from '../../components/OversizedPanel'
import Modal from '../../components/Modal'
import { DownArrow, DownArrowBackground } from '../../components/ExchangePage'
import { amountFormatter } from '../../utils'
import { ColoredDropdown } from '../Pool/ModeSelector'
import { useUpdateFundsMessage } from '../../contexts/FundsMessage'
const arbTokenAddress = process.env.REACT_APP_ARBISWAP_ADDRESS
const defaultBridgeParams = {}

const TransferTypeSelection = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.royalBlue};
  font-weight: 500;
  cursor: pointer;

  :hover {
    color: ${({ theme }) => lighten(0.1, theme.royalBlue)};
  }

  img {
    height: 0.75rem;
    width: 0.75rem;
  }
`

const TransferTypeModal = styled.div`
  background-color: ${({ theme }) => theme.inputBackground};
  width: 100%;
  height: 100%;
  padding: 2rem 0 2rem 0;
`

const ModalOption = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  padding: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.doveGray};
  font-size: 1rem;

  &.active {
    background-color: ${({ theme }) => theme.inputBackground};
    border-radius: 3rem;
    border: 1px solid ${({ theme }) => theme.mercuryGray};
    font-weight: 500;
    color: ${({ theme }) => theme.royalBlue};
  }

  &:hover {
    color: ${({ theme }) => lighten(0.1, theme.royalBlue)};
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;

  button {
    max-width: 20rem;
  }
`

const DetailRows = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  padding: 0.5rem 0;
`

const PanelRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  color: ${({ theme }) => theme.doveGray};
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  padding: 0.25rem 1rem;
`

const WithdrawLockBoxBtn = styled.span`
  border: 1px solid ${({ theme }) => theme.royalBlue};
  padding: 0.5rem;
  border-radius: 3rem;
  transition: all 0.4s;

  &:hover {
    color: ${({ theme }) => theme.royalBlue};
    cursor: pointer;
  }
`

const CurrencyInputDescription = styled.span`
  color: ${({ theme }) => darken(0.2, theme.doveGray)} !important;
  &:hover {
    cursor: initial !important;
  }
`

const StyledQuestionMark = styled(QuestionMark)`
  padding-left: 0.5rem;
`

const TransferType = {
  toArb: 1,
  fromArb: 2
}

const ETH_TOKEN = 'ETH'

// TODO symbol image search overrides for each symbol if possible
export default function Bridge({ params = defaultBridgeParams }) {
  const [transferType, setTransferType] = useState(TransferType.toArb)
  const [transferValue, setTransferValue] = useState('0.0')
  let [selectedToken, setToken] = useState(ETH_TOKEN)
  const [modalOpen, setModalOpen] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // const { connector, connectorName, library } = useWeb3Context()
  const { t: translated } = useTranslation()
  const { balances, bridgeTokens, ...bridge } = useArbTokenBridge(
    process.env.REACT_APP_ARB_VALIDATOR_URL,
    // new ethers.providers.Web3Provider(library.provider),
    new ethers.providers.Web3Provider(window.ethereum),
    process.env.REACT_APP_ARB_AGGREGATOR_URL,
    0,
    true
  )
  const unlockToken = bridge.token.approve

  const vmIdParsed = bridge.vmId.slice(0, 8) || '0x'

  const transferTypeNames = {
    [TransferType.toArb]: `Ethereum -> Arbitrum Rollup @ ${bridge.vmId}`,
    [TransferType.fromArb]: ` Arbitrum ${bridge.vmId} -> Ethereum`
  }
  const transferTypeNamesTrimmed = {
    [TransferType.toArb]: `Ethereum -> Arbitrum Rollup @ ${vmIdParsed}...`,
    [TransferType.fromArb]: ` Arbitrum ${vmIdParsed}... -> Ethereum`
  }

  const combinedEthDetails = {
    [ETH_TOKEN]: {
      name: 'Ethereum',
      symbol: ETH_TOKEN,
      decimals: 18,
      exchangeAddress: null,
      balance: balances.eth.balance,
      ethRate: ethers.constants.One
    }
  }

  const combinedArbDetails = {
    [ETH_TOKEN]: {
      ...combinedEthDetails[ETH_TOKEN],
      name: `Ethereum @ Arbitrum Rollup ${vmIdParsed}`,
      balance: balances.eth.arbChainBalance
    }
  }

  for (const addr in balances.erc20) {
    const token = bridgeTokens[addr]
    combinedEthDetails[addr] = {
      name: token.name,
      symbol: token.symbol,
      decimals: token.decimals,
      balance: balances.erc20[addr].balance,
      ethRate: ethers.constants.One,
      exchangeAddress: null
    }
    combinedArbDetails[addr] = {
      ...combinedEthDetails[addr],
      balance: balances.erc20[addr].arbChainBalance
    }
  }
  /* ensure selectedToken data is loaded; fallback to ETH if it isn't */
  if (!combinedArbDetails[selectedToken] || !combinedEthDetails[selectedToken]) {
    console.warn('TOKEN NOT FOUND, FALLING BACK TO ETH')
    selectedToken = ETH_TOKEN
  }
  const getLockboxBalance = () => {
    if (selectedToken === ETH_TOKEN) {
      return ethers.utils.formatEther(balances.eth.lockBoxBalance)
    } else {
      return amountFormatter(
        balances.erc20[selectedToken].lockBoxBalance,
        combinedEthDetails[selectedToken].decimals,
        4
      )
    }
  }
  const lockBoxBalance = getLockboxBalance()
  const displayLockBoxBalance = `${lockBoxBalance} ${combinedEthDetails[selectedToken].symbol}`

  const handleInput = value => {
    if (isLoading || value.split('.')[1]?.length > combinedEthDetails[selectedToken].decimals) {
      return
    }
    setTransferValue(value)
  }

  const handleSelectToken = address => {
    let maybePromise
    if (address !== ETH_TOKEN && !bridgeTokens[address]) {
      maybePromise = bridge.token.add(address, TokenType.ERC20)
    }

    return Promise.resolve(maybePromise).then(() => setToken(address))
  }

  const asyncAction = cb => async () => {
    setLoading(true)
    setErrorMessage('')
    try {
      await cb()
    } catch (e) {
      console.error(e)
      setErrorMessage(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleButtonClick = asyncAction(async () => {
    console.log('btn click')
    try {
      switch (transferType) {
        case TransferType.toArb:
          if (selectedToken === ETH_TOKEN) {
            await bridge.eth.deposit(transferValue)
          } else {
            if (!bridgeTokens[selectedToken].allowed) {
              await bridge.token.approve(selectedToken)
            }
            await bridge.token.deposit(selectedToken, transferValue)
          }
          break
        case TransferType.fromArb:
          if (selectedToken === ETH_TOKEN) {
            await bridge.eth.withdraw(transferValue)
          } else {
            await bridge.token.withdraw(selectedToken, transferValue)
          }
          break
        default:
          throw new Error('unhandled transfer type', transferType)
      }
      setTransferValue('0')
    } catch (e) {
      e.message = `Transfer failed: ${e.message}`
      throw e
    }
  })

  const withdrawLockbox = asyncAction(async () => {
    try {
      if (selectedToken === ETH_TOKEN) {
        await bridge.eth.withdrawLockBox()
      } else {
        await bridge.token.withdrawLockBox(selectedToken)
      }
    } catch (e) {
      e.message = `Lock box withdrawal failed: ${e.message}`
      throw e
    }
  })

  const inputPanelProps = {
    selectedTokenAddress: selectedToken,
    value: transferValue
  }

  const [inputName, inputDetails, outputName, outputDetails] =
    transferType === TransferType.toArb
      ? ['Ethereum', combinedEthDetails, 'Arbitrum', combinedArbDetails]
      : [`Arbitrum`, combinedArbDetails, 'Ethereum', combinedEthDetails]

  const inputBalanceFormatted = amountFormatter(
    inputDetails[selectedToken].balance,
    inputDetails[selectedToken].decimals,
    inputDetails[selectedToken].decimals
  )
  const outputBalanceFormatted = amountFormatter(
    outputDetails[selectedToken].balance,
    outputDetails[selectedToken].decimals,
    outputDetails[selectedToken].decimals
  )

  const showInputUnlock =
    transferType === TransferType.toArb && selectedToken !== ETH_TOKEN && !bridgeTokens[selectedToken].allowed

  const pendingLockboxBalance = () => {
    const target = selectedToken === ETH_TOKEN ? balances.eth : balances.erc20[selectedToken]
    return Object.values(target.pendingWithdrawals)
      .map(tx => tx.value)
      .reduce((total, current) => total.add(current), ethers.constants.Zero)
  }
  useUpdateFundsMessage(bridge, balances)
  useEffect(() => {
    if (!bridge.walletAddress || !bridge.vmId) return
    if (!bridge.cache.erc20.includes(arbTokenAddress)) {
      console.info('Adding arbiswap token to cache:')
      bridge.token.add(arbTokenAddress, 'ERC20')
    }
  }, [bridge.walletAddress, bridge.vmId, bridge.cache.erc20, bridge.token])

  return (
    <>
      <OversizedPanel hideTop>
        <TransferTypeSelection onClick={() => setModalOpen(true)}>
          {transferTypeNamesTrimmed[transferType]}
          <ColoredDropdown alt={'arrow down'} />
        </TransferTypeSelection>
        <Modal
          isOpen={modalOpen}
          onDismiss={() => {
            setModalOpen(false)
          }}
        >
          <TransferTypeModal>
            {Object.values(TransferType).map(ttype => (
              <ModalOption
                key={ttype}
                onClick={() => {
                  setTransferType(ttype)
                  setModalOpen(false)
                }}
                className={ttype === transferType ? 'active' : undefined}
              >
                {translated(transferTypeNames[ttype])}
              </ModalOption>
            ))}
          </TransferTypeModal>
        </Modal>
      </OversizedPanel>

      <CurrencyInputPanel
        title={translated('input')}
        // description={<CurrencyInputDescription children={`from ${inputName}`} />}
        allBalances={inputDetails}
        allTokens={inputDetails}
        extraText={`${inputName} balance: ${inputBalanceFormatted}`}
        extraTextClickHander={() => setTransferValue(inputBalanceFormatted)}
        onValueChange={handleInput}
        showUnlock={showInputUnlock}
        onCurrencySelected={handleSelectToken}
        selectModalProps={{ enableCreateExchange: true }}
        errorMessage={errorMessage || showInputUnlock}
        inputDisabled={showInputUnlock}
        tokenSearch={true}
        unlockToken={unlockToken}
        getERC20Info={bridge.token.getERC20Info}
        {...inputPanelProps}
      />

      <OversizedPanel>
        <DownArrowBackground>
          <DownArrow
            active={isLoading}
            clickable
            onClick={() => {
              const next = transferType === TransferType.toArb ? TransferType.fromArb : TransferType.toArb
              setTransferType(next)
            }}
            alt="arrow"
          />
        </DownArrowBackground>
      </OversizedPanel>

      <CurrencyInputPanel
        title={translated('output')}
        // description={<CurrencyInputDescription children={`to ${outputName}`} />}
        allBalances={inputDetails}
        allTokens={inputDetails}
        extraText={`${outputName} balance: ${outputBalanceFormatted}`}
        extraTextClickHander={() => setTransferValue(outputBalanceFormatted)}
        disableTokenSelect
        hideTokenSelect
        inputDisabled
        {...inputPanelProps}
        errorMessage={errorMessage}
      />

      <OversizedPanel hideBottom>
        <DetailRows>
          <PanelRow>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              Lockbox balance: {displayLockBoxBalance}&nbsp;
              {pendingLockboxBalance().gt(0) ? (
                <i>(+{amountFormatter(pendingLockboxBalance(), inputDetails[selectedToken].decimals, 4)} pending)</i>
              ) : null}
              <Tooltip
                label={
                  <span>
                    When withdrawing tokens from an Arbitrum Rollup, they are held in a smart contract lock box. You
                    must withdraw them from this lockbox to your Ethereum wallet.
                  </span>
                }
                style={{
                  background: 'hsla(0, 0%, 0%, 0.75)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '0.6rem 0.6rem 0.6rem 1.3rem',
                  marginTop: '-64px',
                  marginLeft: '48px',
                  maxWidth: '150px',
                  whiteSpace: 'normal'
                }}
              >
                <StyledQuestionMark />
              </Tooltip>
            </span>
            {lockBoxBalance > 0 && (
              <WithdrawLockBoxBtn
                onClick={() => withdrawLockbox()}
                children={isLoading ? <Spinner src={Circle} alt={'Loading...'} /> : 'Withdraw'}
              />
            )}
          </PanelRow>
        </DetailRows>
      </OversizedPanel>

      <ButtonContainer>
        <Button disabled={isLoading} onClick={handleButtonClick} warning={!!errorMessage}>
          {/* text should provide destination context */}
          {isLoading ? <Spinner src={Circle} alt={'Loading...'} /> : translated(`Transfer to ${outputName} Wallet`)}
        </Button>
      </ButtonContainer>
    </>
  )
}
