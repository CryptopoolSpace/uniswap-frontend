import React, { useState } from 'react'
import styled from 'styled-components'
import { transparentize } from 'polished'
import TweetButton from './TweetButton'
import { Link } from '../../theme'
import Modal from '../Modal'
import FaucetModal from './FaucetModal'

const TweetFaucetMessage = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  flex: 1 0 auto;
  align-items: center;
  position: relative;
  padding: 0.5rem 1rem;
  padding-right: 2rem;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => transparentize(0.6, theme.tweetBlue)};
  background-color: ${({ theme }) => transparentize(0.9, theme.tweetBlue)};
  border-radius: 2rem;
  font-size: 0.74rem;
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
      cursor: pointer;
    }
  }
  a {
    font-weight: 600;
  }
  overflow: wrap;
`

const TwitterShare = () => {
  const [showTweetShare, setShowTweetShare] = useState(true)
  const hideTweetShare = () => setShowTweetShare(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <>
      <FaucetModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />

      {showTweetShare && (
        <TweetFaucetMessage>
          <span>
            {' '}
            Use your own Ropsten Ether/tokens, or <Link onClick={() => setModalIsOpen(true)}>click here</Link> to
            request some from our faucet!{' '}
          </span>
          <span onClick={hideTweetShare} className="close">
            ✕
          </span>
        </TweetFaucetMessage>
      )}
    </>
  )
  /* Twitter faucet version */
  // return (
  //   <>
  //     {showTweetShare && (
  //       <TweetFaucetMessage>
  //         <span> Use your own Ropsten Ether/tokens, or </span>
  //         <TweetButton />
  //         <span>{"us and we'll send you some!"}</span>
  //         <span onClick={hideTweetShare} className="close">
  //           ✕
  //         </span>
  //       </TweetFaucetMessage>
  //     )}
  //   </>
  // )
}

export default TwitterShare
