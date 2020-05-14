import React from 'react'

function ImageSlide({ text, imageUrl }) {
  return (
    <div>
      <div> {text}</div>
      <div>
        <img src={imageUrl} alt="" />
      </div>
    </div>
  )
}

export default ImageSlide
