import React from 'react'
import styled from 'styled-components'

const WelcomeImg = styled.img`
  width: 400px;
  height: auto;
`
const WelcomeImgWithBorder = styled.img`
  width: 400px;
  height: auto;
  border: 5px solid #DC6BE5;
  border-radius: 5px;
`

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`

const WelcomeText = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  min-height: 100px;
  line-height: 27px;
`
const WelcomeSliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`

const borderStyle = {   
  border: "4px solid #DC6BE5",
  'border-radius': "5px",
}

const none = {}

function ImageSlide({ text, imageUrl, useBorder = true }) {
  return (
    <WelcomeSliderContainer>
      <WelcomeText> {text}</WelcomeText>
      <ImgWrapper>
        <WelcomeImg src={imageUrl} style={ useBorder ? borderStyle: none} />
      </ImgWrapper>
    </WelcomeSliderContainer>
  )
}

export default ImageSlide
