/* eslint no-template-curly-in-string: 0 */

const baseConfig = {
  _ok: 'ok', // for unittest
  environment: 'dev'
};

const handler = {
  get: (obj, prop) => {
    if (!prop) {
      return;
    }

    const envKeyName = 'REACT_APP_' + prop.toUpperCase();
    if (envKeyName in process.env) {
      return process.env[envKeyName];
    }

    if (prop in baseConfig) {
      return baseConfig[prop];
    }

    return;
  }
};


/**
* @type {Object<string, any>} Config
* @property {string} TMDB_APIKEY apikey for the project.
*/

/**
* @type {Config} environment based configuration
*/
const config = new Proxy(baseConfig, handler);

export default config;
