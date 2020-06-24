import React, { useState } from 'react'
import Modal from '../Modal'
import { useWeb3Context } from 'web3-react'
import styled from 'styled-components'
import axios from 'axios'

import { useTransactionAdder } from '../../contexts/Transactions'
const faucetAddress = process.env.REACT_APP_FUNDS_REQUEST_ADDRESS

const ModalBody = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  width: 100%;
  padding: 2rem;
  span {
    color: ${({ error, theme }) => theme.uniswapPink};
  }
`
const Input = styled.input`
  font-size: 1rem;
  color: ${({ error, theme }) => error && theme.salmonRed};
  background-color: ${({ theme }) => theme.mercuryGray};
  color: white;
  margin-top: 1em;
  margin-bottom: 3px;
  min-width: 30%;
  ::placeholder {
    color: grey;
    opacity: 1; /* Firefox */
  }
  :disabled {
    border: 5px solid blue;
    color: blue;
    opacity: 1; /* Firefox */
  }
`
const Submit = styled.input`
  background-color: ${({ error, theme }) => theme.uniswapPink};
  color: white;
  border-radius: 5px;
  cursor: pointer;
  padding: 4px;
  :disabled {
    opacity: 1;
    background-color: lightgrey;
    color: black;
    cursor: auto;
  }
`

const ErrorMessage = styled.div`
  color: red;
  min-height: 2em;
`

const Form = styled.form``
const FaucetModal = ({ modalIsOpen, setModalIsOpen }) => {
  const { account } = useWeb3Context()
  const [inputVal, setInputVal] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const addTransaction = useTransactionAdder()

  function onSubmit(e) {
    e.preventDefault()
    setErrorMessage('')
    axios
      .post(faucetAddress, {
        address: account,
        token: inputVal
      })
      .then(data => {
        console.info(data)
        addTransaction(data.data)
      })
      .catch(err => {
        const message = err.response && err.response.data ? err.response.data : 'Unknown error'
        setErrorMessage(message)
        setInputVal('')
      })
  }
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onDismiss={() => {
          setModalIsOpen(false)
          setErrorMessage('')
        }}
        minHeight={20}
      >
        <ModalBody>
          <div>
            Send funds to <span>{account}</span>
          </div>
          <form onSubmit={onSubmit}>
            <Input
              warning={true}
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              type="password"
              placeholder="paste access token"
            />
            <ErrorMessage type="text" id="inputWarning" value="bad" editable={false}>
              {errorMessage}{' '}
            </ErrorMessage>
            <Submit disabled={!inputVal} type="submit" />
          </form>
        </ModalBody>
      </Modal>
    </>
  )
}

export default FaucetModal
