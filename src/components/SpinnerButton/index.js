import { Button, Spinner } from '../../theme'
import Circle from '../../assets/images/circle.svg'
import React from 'react'
import { usePendingApproval } from '../../contexts/Transactions'

function SpinnerButton({ disabled, onClick, showSpinner = false, buttonText, warning = false }) {
  const pendingApproval = usePendingApproval()

  return (
    <Button disabled={disabled || pendingApproval} onClick={onClick} warning={warning}>
      {showSpinner || pendingApproval ? <Spinner src={Circle} alt={'Loading...'} /> : buttonText}
    </Button>
  )
}
export default SpinnerButton
