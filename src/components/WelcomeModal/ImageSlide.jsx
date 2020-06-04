import React from 'react'
import styled from 'styled-components'

const WelcomeImg = styled.img`
  width: 400px;
  height: auto;
  border: 4px solid #dc6be5;
  border-radius: 5px;
   ${({ theme }) => theme.mediaWidth.upToMedium`
  width: 320px;
      height: auto;

   `}
   ${({ theme }) => theme.mediaWidth.upToSmall`
   width: 230px;
   height: auto;

 `}
`

const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`

const WelcomeText = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  min-height: 100px;
  line-height: 27px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  font-size:14px;
  line-height: 21px;
`}
`
const WelcomeSliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`

const borderStyle = {
  border: '3px solid #DC6BE5',
  borderRadius: '3px'
}

const none = {}

function ImageSlide({ text, imageUrl, imageStyle = {}, textStyle = {} }) {
  return (
    <WelcomeSliderContainer>
      <WelcomeText style={textStyle}> {text}</WelcomeText>
      <ImgWrapper>
        <WelcomeImg src={imageUrl} style={imageStyle} />
      </ImgWrapper>
    </WelcomeSliderContainer>
  )
}

export default ImageSlide
