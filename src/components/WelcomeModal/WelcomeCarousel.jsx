import React, { useState, useRef, useEffect } from 'react'
import Carousel from 'react-elastic-carousel'
import ImageSlide from './ImageSlide'
import WrongNetworkGif from '../../assets/gifs/wrong-network.gif'
function WelcomeCarousel() {
  const carouselRef = useRef(null)

  const [autoPlayEnabled, setAutoPlay] = useState(true)
  const disableAutoPlay = () => setAutoPlay(false)

  function handleArrowPress(e) {
    e.stopPropagation()
    switch (e.keyCode) {
      case 37:
        carouselRef.current.slidePrev()
        disableAutoPlay()
        break
      case 39:
        carouselRef.current.slideNext()
        disableAutoPlay()
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
  }, [handleArrowPress])

  const config = {
    enableAutoPlay: autoPlayEnabled,
    autoPlaySpeed: 5000,
    itmesToShow: 1
  }
  return (
    <Carousel
      onNextStart={disableAutoPlay}
      onPrevStart={disableAutoPlay}
      {...config}
      ref={carouselRef}
      className="carousel-cont"
    >
      <ImageSlide
        text={
          <span>
            'Welcome to Arbiswap! To get started,{' '}
            <a target="_blank" href="https://metamask.io/download.html">
              install metamask
            </a>{' '}
            , asdf asdf sadf sadf sad sadf saf sadf sadf and connect to ropsten' ad sadf saf sadf sadfad sadf saf sadf sadfad sadf saf sadf sadfad sadf saf sadf sadf{' '}
          </span>
        }
        imageUrl={WrongNetworkGif}
      />
      <ImageSlide
        text={<span> If you need tokens, tweet at us</span>}
        imageUrl={'https://picsum.photos/seed/200/300'}
      />
      <ImageSlide
        text={<span>'Otherwise, deposit some directly onto layer two'</span>}
        imageUrl={'https://picsum.photos/200/300'}
      />
    </Carousel>
  )
}

export default WelcomeCarousel
