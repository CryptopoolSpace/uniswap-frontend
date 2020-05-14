import React, { useState, useRef, useEffect } from 'react'
import Carousel from 'react-elastic-carousel'
import ImageSlide from './ImageSlide'

function WelcomeCarousel() {
  const carouselRef = useRef(null)

  function handleArrowPress(e) {
    e.stopPropagation()
    switch (e.keyCode) {
      case 37:
        carouselRef.current.slidePrev()
        break
      case 39:
        carouselRef.current.slideNext()
        break
      default:
        break
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleArrowPress)
    return () => {
      document.removeEventListener('keydown', handleArrowPress)
    }
  }, [])

  return (
    <Carousel ref={carouselRef} className="carousel-cont" itemsToShow={1}>
      <ImageSlide
        text={'Welcome to Arbiswap! To get started, install metamask, and connect to ropsten'}
        imageUrl={'https://www.placecage.com/g/200/300'}
      />
      <ImageSlide
        text={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip e'
        }
        imageUrl={'https://www.placecage.com/200/300'}
      />
      <ImageSlide
        text={
          ' vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi'
        }
        imageUrl={'https://www.placecage.com/c/200/300'}
      />
    </Carousel>
  )
}

export default WelcomeCarousel
