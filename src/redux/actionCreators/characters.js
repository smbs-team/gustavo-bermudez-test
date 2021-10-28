import {
  LOAD_CHARACTERS_FAILURE,
  LOAD_CHARACTERS_REQUEST,
  LOAD_CHARACTERS_SUCCESS,
  LOAD_CHARACTERS_BY_COMIC_REQUEST,
  LOAD_CHARACTERS_BY_COMIC_SUCCESS,
  LOAD_CHARACTERS_BY_COMIC_FAILURE,
  LOAD_CHARACTERS_BY_STORY_REQUEST,
  LOAD_CHARACTERS_BY_STORY_SUCCESS,
  LOAD_CHARACTERS_BY_STORY_FAILURE,
  LOAD_CHARACTER_BY_ID_REQUEST,
  LOAD_CHARACTER_BY_ID_SUCCESS,
  LOAD_CHARACTER_BY_ID_FAILURE,
} from "../constants/api"
import fetchAxios from "../../services/axios"

export const loadCharacters = ({
  nameStartsWith = "",
  limit = 20,
  offset = 0,
  comicsIds = [],
  storiesIds = [],
  orderBy = "name",
}) => {
  return {
    types: [
      LOAD_CHARACTERS_REQUEST,
      LOAD_CHARACTERS_SUCCESS,
      LOAD_CHARACTERS_FAILURE,
    ],
    shouldCallAPI: () => true,
    callAPI: () =>
      fetchAxios({
        url: "/characters",
        params: {
          ...(nameStartsWith && { nameStartsWith }),
          ...(comicsIds.length > 0 && { comics: comicsIds.join(",") }),
          ...(storiesIds.length > 0 && { stories: storiesIds.join(",") }),
          limit,
          offset,
          orderBy,
        },
      }),
  }
}

export const loadCharactersByComic = ({
  nameStartsWith = "",
  limit = 20,
  offset = 0,
  comicId,
}) => {
  return {
    types: [
      LOAD_CHARACTERS_BY_COMIC_REQUEST,
      LOAD_CHARACTERS_BY_COMIC_SUCCESS,
      LOAD_CHARACTERS_BY_COMIC_FAILURE,
    ],
    shouldCallAPI: () => true,
    callAPI: () =>
      fetchAxios({
        url: `/comics/${comicId}/characters`,
        params: { ...(nameStartsWith && { nameStartsWith }), limit, offset },
      }),
  }
}

export const loadCharactersByStory = ({
  nameStartsWith = "",
  limit = 20,
  offset = 0,
  storyId,
}) => {
  return {
    types: [
      LOAD_CHARACTERS_BY_STORY_REQUEST,
      LOAD_CHARACTERS_BY_STORY_SUCCESS,
      LOAD_CHARACTERS_BY_STORY_FAILURE,
    ],
    shouldCallAPI: () => true,
    callAPI: () =>
      fetchAxios({
        url: `/stories/${storyId}/characters`,
        params: { ...(nameStartsWith && { nameStartsWith }), limit, offset },
      }),
  }
}

export const getCharacter = id => {
  return {
    types: [
      LOAD_CHARACTER_BY_ID_REQUEST,
      LOAD_CHARACTER_BY_ID_SUCCESS,
      LOAD_CHARACTER_BY_ID_FAILURE,
    ],
    shouldCallAPI: () => !!id,
    callAPI: () =>
      fetchAxios({
        url: `/characters/${id}`,
      }),
  }
}
