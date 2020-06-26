import React, { useState, useEffect, useCallback} from 'react'
import Modal from '../Modal'
import { useWeb3Context } from 'web3-react'
import styled from 'styled-components'
import axios from 'axios'
import SpinnerButton from '../SpinnerButton'
import { Button, Spinner } from '../../theme'
import Circle from '../../assets/images/circle.svg'
import { useFundsMessageContext, fundsMessagesEnum } from '../../contexts/FundsMessage'

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
const Submit = styled.button`
  background-color: ${({ error, theme }) => theme.uniswapPink};
  color: white;
  border-radius: 5px;
  cursor: pointer;
  padding: 4px;
  min-width: 55px;
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
  const [waiting, setWaiting] = useState(false)
  const [fundsMessageState] = useFundsMessageContext()
  
  const clearModal = useCallback(()=>{
    setModalIsOpen(false)
    setWaiting(false)
    setInputVal('')
  })
  useEffect(()=>{
    if (fundsMessageState === fundsMessagesEnum.SHOW_RECEIVED){
        clearModal()
    }   
  },[clearModal, fundsMessageState])

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
        setWaiting(true)
      })
      .catch(err => {
        const message = err.response && err.response.data ? err.response.data : 'Unknown error'
        setErrorMessage(message)
        setInputVal('')
        setWaiting(false)
      })
  }
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onDismiss={clearModal}
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
            <Submit disabled={!inputVal} type="submit" value>{ waiting ? <Spinner src={Circle}/> : "submit"}</Submit>
          </form>
        </ModalBody>
      </Modal>
    </>
  )
}

export default FaucetModal
