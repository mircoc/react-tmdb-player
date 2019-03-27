import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import "react-alice-carousel/lib/alice-carousel.css"


const Carousel = props => {
  const {items} = props

  const responsive = {
    0: { items: 4 },
    600: { items: 6 },
    1200: { items: 8 },
  }
  // debugger
  return (
    <AliceCarousel
      items={items}
      responsive={responsive}
      autoPlayInterval={2000}
      autoPlayDirection="rtl"
      // autoPlay={true}
      fadeOutAnimation={true}
      mouseDragEnabled={true}
      // playButtonEnabled={true}
      // disableAutoPlayOnAction={true}
      dotsDisabled={false}
      buttonsDisabled={true}
    />
  )
}

export default Carousel