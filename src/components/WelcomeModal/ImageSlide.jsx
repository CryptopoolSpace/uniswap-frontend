import React from 'react'
import styled from 'styled-components'

const WelcomeImg = styled.img`
  width: 400px;
  height: auto;
`

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const WelcomeText = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  min-height: 100px;
`
const WelcomeSliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`

function ImageSlide({ text, imageUrl }) {
  return (
    <WelcomeSliderContainer>
      <WelcomeText> {text}</WelcomeText>
      <ImgWrapper>
        <WelcomeImg src={imageUrl} />
      </ImgWrapper>
    </WelcomeSliderContainer>
  )
}

export default ImageSlide
