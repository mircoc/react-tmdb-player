import React from 'react'
import ErrorFullScreen from '../components/ErrorFullScreen';
import PageContainer from '../components/PageContainer';

const NotFound = props => {
  const { location = {} } = props;
  return (
    <PageContainer containerClassName="fullscreen" rowClassName="fullscreen">
      <ErrorFullScreen message={`Object not found for ${location.pathname}`} />
    </PageContainer>
  )
}

export default NotFound