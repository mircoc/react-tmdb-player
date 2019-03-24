import { ITEM_TYPES } from "../apis";
const BASEPATH = `/react-tmdb-player`

const routes = {
  HOME: `${BASEPATH}/`,
  DETAILMOVIE: `${BASEPATH}/movie/:id`,
  DETAILTV: `${BASEPATH}/tv/:id`,
  SEARCH: `${BASEPATH}/search/`,
  SEARCHKEYWORD: `${BASEPATH}/search/:keyword`,
}

export const getRouteForDetail = (id, itemType) => {
  switch (itemType) {
    case ITEM_TYPES.TV:
      return routes.DETAILTV.replace(`:id`, id)
    case ITEM_TYPES.MOVIE:
    default:
      return routes.DETAILMOVIE.replace(`:id`, id)
    
  }
}

export default routes