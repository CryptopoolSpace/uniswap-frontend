import React from 'react'
import styled from 'styled-components'

import { Link } from '../../theme'
import Web3Status from '../Web3Status'
import { darken } from 'polished'
import { slide as MobileMenu } from 'react-burger-menu'
import logo from '../../assets/images/arbiswap2.png'

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const HeaderElement = styled.div`
  margin: 1.25rem;
`

const Nod = styled.span`
  transform: rotate(0deg);
  transition: transform 150ms ease-out;

  :hover {
    transform: rotate(-10deg);
  }

  #arbiswaplogo {
    max-width: 100%;
    max-height: 100%;
    height: 2em;
    width: auto;
  }
`

const Title = styled.div`
  #title {
    display: inline;
    margin: 0 1vw;
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.wisteriaPurple};
    :hover {
      color: ${({ theme }) => darken(0.1, theme.wisteriaPurple)};
    }
  }

  /* CSS that follows accomodates mobile menu as necessary*/
  .bm-burger-button {
    display: none;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    .bm-burger-button {
      display: initial;
    }

    .link {
      display: block;
    }

    .unicorn {
      display: none;
    }
  `}
`

const DefaultMenu = styled.div`
  display: flex;

  .unicorn {
    padding-right: 10px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: none;
  `}
`

const Divider = styled.span`
  display: initial;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: none;
  `}
`

const MobileTitle = styled.div`
  display: none;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: initial;
    position: relative;
    left: 0%; /* offset needed to center */
  `}
`

const MobileMenuStyles = styled.span`
  .bm-burger-button {
    position: fixed;
    width: 36px;
    height: 30px;
    left: 6vw;
    top: 20px;
  }
  .bm-burger-bars {
    background: #36454f;
  }
  .bm-burger-bars-hover {
    background: #a90000;
  }
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }
  .bm-cross {
    background: #bdc3c7;
  }
  .bm-menu-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 35vw !important;
  }
  .bm-menu {
    background: #373a47;
    padding: 2.5em 1em 0;
    font-size: 1.15em;
  }
  .bm-morph-shape {
    fill: #373a47;
  }
  .bm-item-list {
    color: #b8b7ad;
    padding: 0.8em;
    height: auto !important;
  }
  .bm-item {
    display: inline-block;
  }
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
  }
`

const noddingUnicorn = (
  <Nod className={'unicorn'}>
    <Link className={'link'} href="qqq">
      <img src={logo} id="arbiswaplogo" alt="Logo" />
    </Link>
  </Nod>
)

export default function Header({ setShouldOpenModalCache }) {
  const showWelcomeModal = () => setShouldOpenModalCache(true)
  const menuLinks = [
    <Link className={'link'} href="qqq">
      <h1 id="title">Arbiswap</h1>
    </Link>,
    <Link className={'link'} href="https://developer.offchainlabs.com">
      <h1 id="title">Arbitrum Documentation</h1>
    </Link>,
    <Link className={'link'} disabled onClick={showWelcomeModal}>
      <h1 id="title">Get Started </h1>
    </Link>
  ]
  const mobileMenuLinks = menuLinks.map((el, idx) => (
    <ul>
      <li key={idx}>{el}</li>
    </ul>
  ))

  const defaultMenuLinks = [noddingUnicorn, ...menuLinks].reduce((result, el, idx) => {
    if (idx > 1) {
      result.push(<Divider key={idx - 0.5} children={'|'} />)
    }
    result.push({ ...el, key: idx })
    return result
  }, [])

  return (
    <HeaderFrame>
      <HeaderElement>
        <Title>
          <MobileMenuStyles>
            <MobileMenu children={mobileMenuLinks} />
          </MobileMenuStyles>
          <DefaultMenu children={defaultMenuLinks} />
        </Title>
      </HeaderElement>
      <HeaderElement>
        <MobileTitle>{noddingUnicorn}</MobileTitle>
      </HeaderElement>
      <HeaderElement>
        <Web3Status />
      </HeaderElement>
    </HeaderFrame>
  )
}
