import Modal from '../Modal'
import React, { useState } from 'react'
import { useLocalStorage } from '@rehooks/local-storage'
import styled from 'styled-components'
import './style.css'
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
  // const [isOpen, setModalIsOpen] = useLocalStorage('welcomeModal', true)
  const [isOpen, setModalIsOpen] = useState(true)

  const closeModal = () => setModalIsOpen(false)
  return (
    <Modal isOpen={isOpen} onDismiss={closeModal} minHeight={'75'}>
      <ModalContainer>
        <ModalHeader>Arbiswap</ModalHeader>
        <Carousel />
      </ModalContainer>
    </Modal>
  )
}

export default WelcomeModal
