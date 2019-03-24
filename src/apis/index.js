import get from 'lodash/get'
import superagent from 'superagent'

import config from "../configs";

const API_BASEURL = "https://api.themoviedb.org/3"

const APIKEY = config.TMDB_APIKEY

const IMSECURE = window.location.protocol === 'https:'

const apiKeyPlugin = req => {
  req.query({ api_key: APIKEY })
}

const request = {
  get: (url, params = {}) => superagent.get(`${API_BASEURL}${url}`).query(params).use(apiKeyPlugin)
}

const Common = {
  configuration: () => request.get("/configuration")
}

const Movies = {
  popular: () => request.get("/movie/popular"),
  discoverByGenre: (genreId) => request.get("/discover/movie", {with_genres: genreId}),
  details: (id) => request.get(`/movie/${id}`)
}

const Series = {
  popular: () => request.get("/tv/popular"),
  discoverByGenre: (genreId) => request.get("/discover/tv", {with_genres: genreId}),
  details: (id) => request.get(`/tv/${id}`)
}

const Lists = {
  byTypeOptions: (type, options) => {
    switch(type) {
      case LIST_TYPES.POPULAR_MOVIES:
        return Movies.popular()
      case LIST_TYPES.POPULAR_SERIES:
        return Series.popular()
      case LIST_TYPES.MOVIES_GENRE:
        return Movies.discoverByGenre(options.genre)
      case LIST_TYPES.SERIES_GENRE:
        return Series.discoverByGenre(options.genre)
      default:
        throw new Error(`unknown list type: ${type}`)
    }
  }
}

const Details = {
  byType: (itemType, id) => {
    switch(itemType) {
      case ITEM_TYPES.MOVIE:
        return Movies.details(id)
      case ITEM_TYPES.TV:
        return Series.details(id)
      default:
      debugger
        throw new Error(`unknown item type: ${itemType}`)
    }
  }
}

const Search = {
  multi: (query) => request.get("/search/multi", {query})
}

const api = {
  Common,
  Movies,
  Series,
  Lists,
  Details,
  Search,
}

export const LIST_TYPES = {
  POPULAR_MOVIES: "POPULAR_MOVIES",
  POPULAR_SERIES: "POPULAR_SERIES",
  MOVIES_GENRE: "MOVIES_GENRE",
  SERIES_GENRE: "SERIES_GENRE",
}

// https://developers.themoviedb.org/3/genres/get-movie-list
export const GENRES_MOVIE = {
  Family: 10751,
  Documentary: 99
}

export const ITEM_TYPES = {
  MOVIE: 'MOVIE',
  TV: 'TV'
}

const movieFormatter = (item) => {
  return {
    id: item.id,
    title: item.title,
    poster_path: item.poster_path,
    itemType: ITEM_TYPES.MOVIE
  }
}

const seriesFormatter = (item) => {
  return {
    id: item.id,    
    title: item.name,
    poster_path: item.poster_path,
    itemType: ITEM_TYPES.TV
  }
}

export const getListItemFormatter = (listType) => {
  switch(listType) {
    case LIST_TYPES.POPULAR_SERIES:
    case LIST_TYPES.SERIES_GENRE:
      return seriesFormatter
    default:
      return movieFormatter
  }
}

export const IMAGE_POSTER_SIZES = {
  xs: 'w92',
  sm: 'w154',
  md: 'w342',
  lg: 'w500',
  xl: 'w780',
}

export const makeImageUrl = (imageUrl, size, configurationResponse) => {
  const baseUrl = get(configurationResponse, IMSECURE ? 'images.secure_base_url' : 'images.base_url', "")
  return `${baseUrl}${size}${imageUrl}`
}

/**
 * 
 * @param {Object} response - a paginated api response
 * @returns {Array} results not formatted
 */
export const getPaginatedResult = response => {
  return response.results
}

/**
 * 
 * @param {Object} response - search api response
 * @returns {Array} results formatted
 */
export const getSearchResult = response => {
  // format all results with proper formatter and ignore
  //   media_type not relevant
  return response.results.reduce((acc, current) => {
    const {media_type} = current
    switch (media_type) {
      case "movie":
        return [
          ...acc,
          movieFormatter(current)
        ]
      case "tv":
        return [
          ...acc,
          seriesFormatter(current)
        ]
      default:
        return acc
    }
  }, [])
}

// this url is not accessible from the player so i used the demo video of shaka player
// export const MOCK_VIDEO_URL = "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
export const MOCK_VIDEO_URL = "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd"
export const MOCK_VIDEO_URL_SECURE = "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"

export default api