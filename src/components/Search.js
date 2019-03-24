import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import CardColumns from 'react-bootstrap/CardColumns'
import isEmpty from 'lodash/isEmpty'

import PropTypes from 'prop-types'
import { MdSearch } from 'react-icons/md';
import MovieCard from './MovieCard';
import { IMAGE_POSTER_SIZES, makeImageUrl } from '../apis';

const Search = props => {
  const {keyword, query, loading, results, fetchSearch, configurationTmdb} = props
  const [searchValue, setSearchValue] = React.useState(keyword || query)

  const MoviCardsItems = results ? results
    .filter(item => item.poster_path && item.title)
    .map(item => {
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
  }) : null

  return (
    <Container className="mt-4">
      <Row className="mt-4">
        <Col>
          <h1>Search</h1>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Form onSubmit={e => {
            e.preventDefault()
            fetchSearch(searchValue)
          }}>
            <Form.Row>
              <Col sm={10}>
                <Form.Control autoFocus placeholder="search movies and tv series titles" value={searchValue} onChange={e => {
                  setSearchValue(e.target.value)
                }}/>
              </Col>
              <Col sm={2}>
                <Button disabled={loading || isEmpty(searchValue)} block variant="primary" type="submit">
                  {loading && 
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  }
                  {!loading && <MdSearch />}
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <CardColumns>
            {MoviCardsItems}
          </CardColumns>
        </Col>
      </Row>
    </Container>
  )
}

Search.defaultProps = {
  keyword: "",
  query: "",
  results: [],
}

Search.propTypes = {
  /** query from url for sharing search result */
  keyword: PropTypes.string,

  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  
  /** searched query from reducer for result */
  query: PropTypes.string,

  results: PropTypes.array,

  fetchSearch: PropTypes.func,
}

export default Search