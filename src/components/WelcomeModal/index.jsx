import Modal from '../Modal'
import React, { useState, useEffect, useCallback } from 'react'
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

function WelcomeModal({ shouldOpenModalCache, setShouldOpenModalCache }) {
  const [isOpen, setModalIsOpen] = useState(false)
  const [delay, setDelay] = useState(1500)

  useEffect(() => {
    shouldOpenModalCache &&
      window.setTimeout(() => {
        setModalIsOpen(true)
      }, delay)
    setDelay(0)
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
