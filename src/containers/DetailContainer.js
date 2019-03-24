import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { fetchDetailIfNeeded, getDetailKey } from '../actions';
import { compose } from 'recompose';
import withLoading from '../hocs/withLoading';
import Detail from '../components/Detail';
import { ITEM_TYPES } from '../apis';

class DetailContainerBase extends React.Component {
  componentWillMount() {
    this.props.onLoad();
  }
  render() {
    return (<Detail {...this.props} />)
  }
}

function getItemTypeFromProps({isTv, isMovie}) {
  if (isTv) return ITEM_TYPES.TV
  if (isMovie) return ITEM_TYPES.MOVIE
}

const mapStateToProps = (state, ownProps) => {
  const {id} = ownProps
  const itemType = getItemTypeFromProps(ownProps)
  const detailKey = getDetailKey(itemType, id)
  const detailState = state.detailsByKey[detailKey] || {
    loading: true,
    error: false,
    item: {}
  }
  return {
    ...detailState,
    itemType,
    configurationTmdb: state.common.configuration
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {id} = ownProps
  const itemType = getItemTypeFromProps(ownProps)
  return {
    onLoad: () => dispatch(fetchDetailIfNeeded(itemType, id)),
  }
};

const DetailContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLoading(props => props.loading)
)(DetailContainerBase)

DetailContainer.defaultProps = {}

DetailContainer.propTypes = {
  /**  */
  id: PropTypes.string.isRequired,

  isTv: PropTypes.bool,
  isMovie: PropTypes.bool,
}

export default DetailContainer