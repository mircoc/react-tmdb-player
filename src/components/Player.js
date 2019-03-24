import React from 'react'
import PropTypes from 'prop-types'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'

function initPlayer(playerId, videoUrl) {
  // Create a Player instance.
  var video = document.getElementById(playerId);
  var player = new window.shaka.Player(video);

  // Attach player to the window to make it easy to access in the JS console.
  window.player = player;

  // Listen for error events.
  player.addEventListener('error', onErrorEvent);

  // Try to load a manifest.
  // This is an asynchronous process.
  player.load(videoUrl).then(function() {
    // This runs if the asynchronous load is successful.
    console.log('[ShakaPlayer] The video has now been loaded!');

    if (video.requestFullscreen) {
      console.log('[ShakaPlayer] requesting full screen ...');
      video.requestFullscreen();
    } else {
      console.error('[ShakaPlayer] full screen not available!');
    }
  }).catch(onError);  // onError is executed if the asynchronous load fails.
}

function onErrorEvent(event) {
  // Extract the shaka.util.Error object from the event.
  onError(event.detail);
}

function onError(error) {
  // Log the error.
  console.error('[ShakaPlayer] Error code', error.code, 'object', error);
}

const Player = props => {
  const {id, imageUrl, videoUrl, width} = props

  React.useEffect(()=> {
    // Install built-in polyfills to patch browser incompatibilities.
    window.shaka.polyfill.installAll();

    // Check to see if the browser supports the basic APIs Shaka needs.
    if (window.shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      initPlayer(id, videoUrl);
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error('[ShakaPlayer] Browser not supported!');
    }
  }, [id, imageUrl,videoUrl])

  return (
    <ResponsiveEmbed aspect="a16by9">
      <video id={id}
        width={width}
        poster={imageUrl}
        controls
        autoPlay
      >
      </video>
    </ResponsiveEmbed>
    
  )
}

Player.defaultProps = {
  id: "video",
  width: "640",
}

Player.propTypes = {
  /**  */
  imageUrl: PropTypes.string.isRequired,

  videoUrl: PropTypes.string.isRequired,

  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
}


export default Player