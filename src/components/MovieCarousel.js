import React from 'react'
import Carousel from './Carousel';
import MovieCard from './MovieCard';
import { makeImageUrl, IMAGE_POSTER_SIZES } from '../apis';

const MovieCarousel = props => {
  const {title, items, configurationTmdb} = props
  const MoviCardsItems = items.map(item => {
    // if (!item.title) {
    //   debugger
    // }
    return (
      <MovieCard
        imageUrl={makeImageUrl(
          item.poster_path,
          IMAGE_POSTER_SIZES.sm,
          configurationTmdb
          )
        }
        {...item}
      />
    )
  })
  return (
    <>
    <h1>{title}</h1>
    <Carousel items={MoviCardsItems} />
    </>
  )
}

export default MovieCarousel