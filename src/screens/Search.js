import React from 'react'
import get from 'lodash/get'
import PageContainer from '../components/PageContainer';
import SearchContainer from '../containers/SearchContainer';

const Search = props => {
  const {match} = props
  const keyword = get(match, 'params.keyword')

  return (
    <PageContainer>
      <SearchContainer keyword={keyword} />
    </PageContainer>
  )
}

export default Search
