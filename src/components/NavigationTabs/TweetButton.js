import React from 'react'
import { useWeb3Context } from 'web3-react'
import styled from 'styled-components'

const TweetLink = styled.a`
  position: relative;
  box-sizing: border-box;
  padding: 1px 8px 1px 6px;
  background-color: #1b95e0;
  color: #fff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  font-family: Helvetica;
`
const TweetButton = () => {
  const { account } = useWeb3Context()
  const text = `@Arbi_Swap hey @OffchainLabs, gimme some Ropsten test tokens plz! ${account || '0xyouraddresshere'}`
    .split(' ')
    .join('%20')
  return (
    <TweetLink target="_blank" href={`https://twitter.com/intent/tweet?text=${text}`}>
      Tweet
    </TweetLink>
  )
}

export default TweetButton
