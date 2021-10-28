import {
  LOAD_COMICS_REQUEST,
  LOAD_COMICS_SUCCESS,
  LOAD_COMICS_FAILURE,
  LOAD_COMIC_BY_ID_REQUEST,
  LOAD_COMIC_BY_ID_SUCCESS,
  LOAD_COMIC_BY_ID_FAILURE,
} from "../constants/api"
import fetchAxios from "../../services/axios"

export const loadComics = ({ limit = 20, offset = 0, ...restParams }) => {
  return {
    types: [LOAD_COMICS_REQUEST, LOAD_COMICS_SUCCESS, LOAD_COMICS_FAILURE],
    shouldCallAPI: () => true,
    callAPI: () =>
      fetchAxios({
        url: "/comics",
        params: {
          ...restParams,
          limit,
          offset,
        },
      }),
  }
}

export const getComic = id => {
  return {
    types: [
      LOAD_COMIC_BY_ID_REQUEST,
      LOAD_COMIC_BY_ID_SUCCESS,
      LOAD_COMIC_BY_ID_FAILURE,
    ],
    shouldCallAPI: () => !!id,
    callAPI: () =>
      fetchAxios({
        url: `/comics/${id}`,
      }),
  }
}
