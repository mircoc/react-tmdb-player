import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { fetchListIfNeeded, getListKey } from '../actions';
import { compose } from 'recompose';
import withLoading from '../hocs/withLoading';
import MovieCarousel from '../components/MovieCarousel';
import { LIST_TYPES, getListItemFormatter } from '../apis';

class MovieCarouselContainerBase extends React.Component {
  componentWillMount() {
    this.props.onLoad();
  }
  render() {
    return (<MovieCarousel {...this.props} />)
  }
}

const mapStateToProps = (state, ownProps) => {
  const {listType, listOptions} = ownProps
  const listKey = getListKey(listType, listOptions)
  const listState = state.listsByType[listKey] || {
    loading: true,
    error: false,
    items: []
  }
  const formatter = getListItemFormatter(listType)
  return {
    error: listState.error,
    loading: listState.loading,
    items: listState.items.map(formatter),
    configurationTmdb: state.common.configuration
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {listType, listOptions} = ownProps
  return {
    onLoad: () => dispatch(fetchListIfNeeded(listType, listOptions)),
  }
};

const MovieCarouselContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLoading(props => props.loading)
)(MovieCarouselContainerBase)

MovieCarouselContainer.defaultProps = {
  listOptions: {}
}

MovieCarouselContainer.propTypes = {
  /** title of the carousel */
  title: PropTypes.string.isRequired,

  /** type of list to show */
  listType: PropTypes.oneOf(Object.keys(LIST_TYPES)).isRequired,
  
  /** options for the list @see https://developers.themoviedb.org/3/discover/movie-discover */
  listOptions: PropTypes.object,
}

export default MovieCarouselContainer