import React from 'react'
import get from 'lodash/get'
import PageContainer from '../components/PageContainer';
import DetailContainer from '../containers/DetailContainer';

const Details = props => {
  const {match, isTv, isMovie} = props
  const id = get(match, 'params.id')

  return (
    <PageContainer>
      <DetailContainer isTv={isTv} isMovie={isMovie} id={id} />
    </PageContainer>
  )
}

export default Details
