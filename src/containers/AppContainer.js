import React from 'react'
import { connect } from 'react-redux';

import App from '../components/App';
import { fetchConfigurationIfNeeded } from '../actions';
import { compose } from 'recompose';
import withLoading from '../hocs/withLoading';

class AppContainer extends React.Component {
  componentWillMount() {
    this.props.onLoad();
  }
  render() {
    const {error, loading} = this.props
    return (<App error={error} loading={loading} />)
  }
}

const mapStateToProps = state => ({
  error: state.common.error,
  loading: state.common.loading,
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(fetchConfigurationIfNeeded()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLoading(props => props.loading)
)(AppContainer)