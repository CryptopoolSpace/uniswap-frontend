import React from 'react'
import styled from 'styled-components'
import { darken, transparentize } from 'polished'
import Toggle from 'react-switch'

import { Link } from '../../theme'
import { useDarkModeManager } from '../../contexts/LocalStorage'
import ArbLogo from '../../assets/images/arblogo.png'

const FooterFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const FooterElement = styled.div`
  margin: 1.25rem;
  display: flex;
  min-width: 0;
  display: flex;
  align-items: center;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.uniswapPink};

  :hover {
    cursor: pointer;
  }
  #link {
    text-decoration-color: ${({ theme }) => theme.uniswapPink};
  }

  #title {
    display: inline;
    font-size: 0.825rem;
    margin-right: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.uniswapPink};
    :hover {
      color: ${({ theme }) => darken(0.2, theme.uniswapPink)};
    }
  }
`

const StyledToggle = styled(Toggle)`
  margin-right: 24px;

  .react-switch-bg[style] {
    background-color: ${({ theme }) => darken(0.05, theme.inputBackground)} !important;
    border: 1px solid ${({ theme }) => theme.concreteGray} !important;
  }

  .react-switch-handle[style] {
    background-color: ${({ theme }) => theme.inputBackground};
    box-shadow: 0 4px 8px 0 ${({ theme }) => transparentize(0.93, theme.shadowColor)};
    border: 1px solid ${({ theme }) => theme.mercuryGray};
    border-color: ${({ theme }) => theme.mercuryGray} !important;
    top: 2px !important;
  }
`

const EmojiToggle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: Arial sans-serif;
`

const OCLDiv = styled.div`
  max-width: 300px;
  display: flex;
  padding-left: 50px;
  // justify-content: flex-end;
  font-size: 14px;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.chaliceGray};
  }
  #arblogo {
    max-width: 100%;
    max-height: 100%;
    width: 1.5em;
    height: auto;
    margin-left: 4px;
    align-self: center;
  }
`

export default function Footer() {
  const [isDark, toggleDarkMode] = useDarkModeManager()

  return (
    <FooterFrame>
      <FooterElement>
        <Title>
          <Link id="link" href="https://offchainlabs.com/">
            <h1 id="title">About</h1>
          </Link>
          <Link id="link" href="https://developer.offchainlabs.com/docs/Developer_Quickstart/">
            <h1 id="title">Docs</h1>
          </Link>
          <Link id="link" href="https://github.com/OffchainLabs/arbitrum">
            <h1 id="title">Arbitrum Code</h1>
          </Link>
          <Link id="link" href="https://github.com/OffchainLabs/uniswap-solidity">
            <h1 id="title">Arbiswap Backend</h1>
          </Link>
          <Link id="link" href="https://github.com/OffchainLabs/uniswap-frontend">
            <h1 id="title">Arbiswap Frontend</h1>
          </Link>
        </Title>
      </FooterElement>
      <OCLDiv>
        <a href="https://offchainlabs.com/" target="_blank" rel="noopener noreferrer">
          Brought to you by Offchain Labs{' '}
        </a>
        <a href="https://offchainlabs.com/" target="_blank" rel="noopener noreferrer">
          <img id="arblogo" src={ArbLogo} alt="" />
        </a>
      </OCLDiv>
      <StyledToggle
        checked={!isDark}
        uncheckedIcon={
          <EmojiToggle role="img" aria-label="moon">
            {/* eslint-disable-line jsx-a11y/accessible-emoji */}
            🌙️
          </EmojiToggle>
        }
        checkedIcon={
          <EmojiToggle role="img" aria-label="sun">
            {/* eslint-disable-line jsx-a11y/accessible-emoji */}
            {'☀️'}
          </EmojiToggle>
        }
        onChange={() => toggleDarkMode()}
      />
    </FooterFrame>
  )
}
