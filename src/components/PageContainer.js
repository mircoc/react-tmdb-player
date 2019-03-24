import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'

import Header from './Header';


const PageContainer = props => {
  const {
    children,
    containerClassName,
    rowClassName,
  } = props
  return (
    <>
      <Header />

      <Container className={containerClassName}>
        <Row className={rowClassName}>
          <Col>
            {children}
          </Col>
        </Row>
      </Container>
    </>
  )
}

PageContainer.defaultProps = {
  containerClassName: "",
  rowClassName: ""
}

PageContainer.propTypes = {
  /** className assigned to container */
  containerClassName: PropTypes.string,
  
  /** className assigned to row */
  rowClassName: PropTypes.string,
}

export default PageContainer
