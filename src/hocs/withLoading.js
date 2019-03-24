import React from 'react'

import DefaultLoadingComponent from '../components/Loading';

/**
 * withLoading HOC branch on a loading status showing a loading indicator or the client component
 * 
 * @param {Function(props<Object>):isLoading<Boolean>} isLoadingFunc - function called with props that return a boolean indicator if should show loading indicator
 * @param {Component} [LoadingComponent]  - optional loading component
 */
const withLoading = (isLoadingFunc, LoadingComponent = DefaultLoadingComponent) => Component => props => (
  <>
    {isLoadingFunc(props) && <LoadingComponent />}
    <Component {...props} />
  </>
)

export default withLoading;
