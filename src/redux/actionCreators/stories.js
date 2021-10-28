import {
  LOAD_STORIES_REQUEST,
  LOAD_STORIES_SUCCESS,
  LOAD_STORIES_FAILURE,
  LOAD_STORY_BY_ID_REQUEST,
  LOAD_STORY_BY_ID_SUCCESS,
  LOAD_STORY_BY_ID_FAILURE,
} from "../constants/api";
import fetchAxios from "../../services/axios";

export const loadStories = ({ limit = 20, offset = 0 }) => {
  return {
    types: [LOAD_STORIES_REQUEST, LOAD_STORIES_SUCCESS, LOAD_STORIES_FAILURE],
    shouldCallAPI: () => true,
    callAPI: () =>
      fetchAxios({
        url: "/stories",
        params: {
          limit,
          offset,
        },
      }),
  };
};

export const getStoryById = (id) => {
  return {
    types: [
      LOAD_STORY_BY_ID_REQUEST,
      LOAD_STORY_BY_ID_SUCCESS,
      LOAD_STORY_BY_ID_FAILURE,
    ],
    shouldCallAPI: () => true,
    callAPI: () =>
      fetchAxios({
        url: `/stories/${id}`
      }),
  };
};
