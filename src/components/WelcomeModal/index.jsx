import Modal from '../Modal'
import React, { useLocalStorage, useState } from 'react'

function WelcomeModal() {
    const [isOpen, setModalIsOpen] = useState(true)
    const closeModal = ()=> setModalIsOpen(false)
    return (
        <Modal 
        isOpen={isOpen} 
        onDismiss={closeModal}
        >
        xyz
        </Modal>
    )
}

export default WelcomeModal
