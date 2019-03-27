import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import { makeImageUrl, IMAGE_POSTER_SIZES, ITEM_TYPES, MOCK_VIDEO_URL } from '../apis';
import { MdPlayCircleFilled } from 'react-icons/md';
import Player from './Player';
import ErrorFullScreen from './ErrorFullScreen';

function formatterMovie({
  title,
  poster_path,
  overview,
  vote_average,
  popularity,
  genres
}) {
  return {
    title,
    image: poster_path,
    description: overview,
    meta: {
      vote: vote_average,
      popularity: popularity,
    }
  }
}
function formatterTv({
  name,
  poster_path,
  overview,
}) {
  return {
    title: name,
    image: poster_path,
    description: overview,
    meta: {}
  }
}
const formaterByType = {
  [ITEM_TYPES.MOVIE]: formatterMovie,
  [ITEM_TYPES.TV]: formatterTv
}

const Detail = props => {
  const [playerVisible, setPlayerVisible] = React.useState(false)

  const {item, configurationTmdb, itemType, loading, error} = props
  
  if (loading) {
    // loader visualization is handled by upper HOC
    return null
  }
  
  if (error) {
    return <ErrorFullScreen message={"Item not found"} />
  }
  
  const {title,description,image,meta} = formaterByType[itemType] ? formaterByType[itemType](item) : item
  const imageUrl = makeImageUrl(
    image,
    IMAGE_POSTER_SIZES.lg,
    configurationTmdb
  )
  return (
    <>
    <Modal show={playerVisible} onHide={() => setPlayerVisible(false)} size={"xl"}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Player
          imageUrl={makeImageUrl(
            image,
            IMAGE_POSTER_SIZES.sm,
            configurationTmdb
          )}
          videoUrl={MOCK_VIDEO_URL}
          width={320}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setPlayerVisible(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    <Container className="m-2 pt-2">
      <Row>
        <Col xs={12} md={6} className={"order-2 order-md-1"}>
          <h1>{title}</h1>

          <p className="lead">
            {description}
          </p>
          <hr />

          <dl className="row">
          {Object.keys(meta).map((metaKey,index) => (
            <React.Fragment key={`meta${index}`}>
              <dt className="col-sm-3">{metaKey}</dt>
              <dd className="col-sm-9">{meta[metaKey]}</dd>
            </React.Fragment>
          ))}
          </dl>

          <hr />

          <Button variant="primary" size="lg" block onClick={e => {
            e.preventDefault()
            setPlayerVisible(true)
          }}>
            <MdPlayCircleFilled /> Play
          </Button>

        </Col>
        <Col xs={12} md={6} className="align-self-center order-1 order-md-2"><Image src={imageUrl} thumbnail /></Col>
      </Row>
    </Container>
    </>
  )
}

Detail.defaultProps = {
}

Detail.propTypes = {
}

export default Detail
