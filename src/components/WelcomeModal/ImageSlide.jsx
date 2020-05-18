import React from 'react'

function ImageSlide({ text, imageUrl }) {
  return (
    <div className="welcome--slide-container">
      <div className="welcome--slide-text"> {text}</div>
      <div className="welcome--slide-image-wrapper">
        <img className="welcome--slide-image" src={imageUrl} alt="" />
      </div>
      <div className="welcome--image-container"></div>
    </div>
  )
}

export default ImageSlide
