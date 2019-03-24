import { ITEM_TYPES } from "../apis";

const routes = {
  HOME: '/',
  DETAILMOVIE: '/movie/:id',
  DETAILTV: '/tv/:id',
  SEARCH: '/search/',
  SEARCHKEYWORD: '/search/:keyword',
}

export const getRouteForDetail = (id, itemType) => {
  switch (itemType) {
    case ITEM_TYPES.TV:
      return routes.DETAILTV.replace(':id', id)
    case ITEM_TYPES.MOVIE:
    default:
      return routes.DETAILMOVIE.replace(':id', id)
    
  }
}

export default routes