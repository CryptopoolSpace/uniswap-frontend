import React, { useState } from 'react'
import styled from 'styled-components'
import { transparentize } from 'polished'

const FundsReceivedMessage = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  flex: 1 0 auto;
  align-items: center;
  position: relative;
  padding: 0.5rem 1rem;
  padding-right: 2rem;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => transparentize(0.6, theme.connectedGreen)};
  background-color: ${({ theme }) => transparentize(0.9, theme.connectedGreen)};
  border-radius: 2rem;
  font-size: 0.75rem;
  line-height: 1rem;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
  color: ${({ theme }) => '#209629'};
  span {
     {
      margin-right: 5px;
      margin-left: 5px;
    }
  }
  span.close {
     {
      right: 1rem;
      position: absolute;
      cursor: pointer;
    }
  }
  overflow: wrap;
`

const FundsReceived = () => {
  const [showTweetShare, setShowTweetShare] = useState(true)
  const hideTweetShare = () => setShowTweetShare(false)
  return (
    <>
      {showTweetShare && (
        <FundsReceivedMessage>
          <span>You've received funds on Arbitrum! Start swapping!</span>
          <span onClick={hideTweetShare} className="close">
            ✕
          </span>
        </FundsReceivedMessage>
      )}
    </>
  )
}

export default FundsReceived
