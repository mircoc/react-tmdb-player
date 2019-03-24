import React from 'react';
import PropTypes from 'prop-types'

import styles from './Loading.module.css'

const Loading = props => {
  const { mx , color } = props;
  const styleColor = {
    borderColor: `${color} transparent transparent transparent`
  };
  return (
    <div className={styles.loading} style={{ marginTop: mx, marginBottom: mx }}>
      <div className="lds-ring">
        <div style={styleColor} />
        <div style={styleColor} />
        <div style={styleColor} />
        <div style={styleColor} />
      </div>
    </div>
  );
};

Loading.defaultProps = {
  mx: "64px",
  color: "#ccc"
}

Loading.propTypes = {
  /** margin x (top and bottom) */
  mx: PropTypes.string,
  
  /** color of the loader */
  color: PropTypes.string,
}

export default Loading
