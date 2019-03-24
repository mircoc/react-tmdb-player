import React from 'react'
import PageContainer from '../components/PageContainer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import MovieCarouselContainer from '../containers/MovieCarouselContainer';
import { LIST_TYPES, GENRES_MOVIE } from '../apis';

const Home = props => {

  return (
    <PageContainer>
      <Container>
        <Row>
          <MovieCarouselContainer
            title={"Popular movies"}
            listType={LIST_TYPES.POPULAR_MOVIES}
          />
        </Row>
        <Row>
          <MovieCarouselContainer
            title={"Popular series"}
            listType={LIST_TYPES.POPULAR_SERIES}
          />
        </Row>
        <Row>
          <MovieCarouselContainer
            title={"Family"}
            listType={LIST_TYPES.POPULAR_SERIES}
            listOptions={{genre: GENRES_MOVIE.Family}}
          />
        </Row>
        <Row>
          <MovieCarouselContainer
            title={"Documentary"}
            listType={LIST_TYPES.MOVIES_GENRE}
            listOptions={{genre: GENRES_MOVIE.Documentary}}
          />
        </Row>
      </Container>
    </PageContainer>
  )
}


export default Home
