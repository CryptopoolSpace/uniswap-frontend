import React, { useState } from 'react'
import styled from 'styled-components'
import { transparentize } from 'polished'
import TweetButton from './TweetButton'

const TweetFaucetMessage = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  cursor: pointer;
  flex: 1 0 auto;
  align-items: center;
  position: relative;
  padding: 0.5rem 1rem;
  padding-right: 2rem;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => transparentize(0.6, theme.tweetBlue)};
  background-color: ${({ theme }) => transparentize(0.9, theme.tweetBlue)};
  border-radius: 2rem;
  font-size: 0.75rem;
  line-height: 1rem;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => '#5CA2FF'};
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
    }
  }
  overflow: wrap;
`

const TwitterShare = () => {
  const [showTweetShare, setShowTweetShare] = useState(true)
  const hideTweetShare = () => setShowTweetShare(false)
=  return (
    <>
      {showTweetShare && (
        <TweetFaucetMessage>
          <span> Use your own Ropsten Ether/tokens, or </span>
          <TweetButton />
          <span>{"us and we'll send you some!"}</span>
          <span onClick={hideTweetShare} className="close">
            ✕
          </span>
        </TweetFaucetMessage>
      )}
    </>
  )
}

export default TwitterShare
