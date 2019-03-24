import { connect } from 'react-redux';

import { fetchSearch } from '../actions';
import { compose } from 'recompose';
import Search from '../components/Search';

const mapStateToProps = (state) => {
  const searchState = state.search

  return {
    ...searchState,
    configurationTmdb: state.common.configuration
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearch: (query) => dispatch(fetchSearch(query)),
  }
};

const SearchContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Search)

export default SearchContainer