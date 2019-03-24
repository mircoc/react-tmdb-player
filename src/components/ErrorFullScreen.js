import React from 'react';
import { MdHelpOutline as Icon } from 'react-icons/md';
import PropTypes from 'prop-types'

import './ErrorFullScreen.css';



const ErrorFullScreen = props => {
  const { message } = props;
  return (
    <div className="container d-flex h-100">
      <div className=" mx-auto align-self-center text-center">
        <Icon className="m-4" size="6em" />
        <h1>
          {message}
        </h1>
      </div>
    </div>
  );
};

ErrorFullScreen.defaultProps = {
  message: "Something went wrong, retry later."
}

ErrorFullScreen.propTypes = {
  message: PropTypes.string.isRequired
}

export default ErrorFullScreen;
