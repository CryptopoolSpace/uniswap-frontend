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
  padding-top: 60px;
`

function WelcomeModal() {
  const [shouldOpenModalCache, setShouldOpenModalCache] = useLocalStorage('welcomeModal', true)
  const [isOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    shouldOpenModalCache &&
      window.setTimeout(() => {
        setModalIsOpen(true)
      }, 1500)
  }, [shouldOpenModalCache])

  const onDismiss = useCallback(() => {
    setModalIsOpen(false)
    shouldOpenModalCache && setShouldOpenModalCache(false)
  }, [setShouldOpenModalCache, shouldOpenModalCache])

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} minHeight={'70'}>
      <ModalContainer>
        <Carousel />
      </ModalContainer>
    </Modal>
  )
}

export default WelcomeModal
