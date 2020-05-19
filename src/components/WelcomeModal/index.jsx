import Modal from '../Modal'
import React, { useState, useEffect, useCallback } from 'react'
import { useLocalStorage } from '@rehooks/local-storage'
import styled from 'styled-components'
import Carousel from './WelcomeCarousel'
const ModalContainer = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  min-height: 1000px;
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`

const ModalHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px 0px 0px 1rem;
  height: 60px;
  font-size: 30px;
`
function WelcomeModal() {
  const [shouldOpenModalCache, setShouldOpenModalCache] = useLocalStorage('welcomeModal', true)
  const [isOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    shouldOpenModalCache &&
      window.setTimeout(() => {
        setModalIsOpen(true)
      }, 1000)
  }, [shouldOpenModalCache])

  const onDismiss = useCallback(() => {
    setModalIsOpen(false)
    shouldOpenModalCache && setShouldOpenModalCache(false)
  }, [setShouldOpenModalCache, shouldOpenModalCache])

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} minHeight={'70'}>
      <ModalContainer>
        <ModalHeader> </ModalHeader>
        <Carousel />
      </ModalContainer>
    </Modal>
  )
}

export default WelcomeModal
