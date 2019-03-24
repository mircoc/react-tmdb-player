import React from 'react'
import Card from 'react-bootstrap/Card'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

import style from './MovieCard.module.css'
import { getRouteForDetail } from '../configs/routes';

export const MovieCard = props => {
  const {
    imageUrl,
    title,
    history,
    itemType,
    id,
  } = props

  return (
    <Card className={`bg-dark text-white ${style.card}`} onClick={e => {
      history.push(getRouteForDetail(id, itemType))
    }}>
      <Card.Img src={imageUrl} alt={title} />
      <Card.ImgOverlay>
        <Card.Title>{title}</Card.Title>
      </Card.ImgOverlay>
    </Card>
  )
}


MovieCard.defaultProps = {}

MovieCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default withRouter(MovieCard)

