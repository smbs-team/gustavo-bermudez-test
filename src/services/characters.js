import fetchAxios from "./axios";

export const loadCharacters = ({
  nameStartsWith = "",
  limit = 20,
  offset = 0,
}) =>
  fetchAxios({
    url: "/characters",
    params: { ...(nameStartsWith && { nameStartsWith }), limit, offset },
  });

export const loadCharactersByComic = ({
  nameStartsWith = "",
  limit = 20,
  offset = 0,
  comicId,
}) =>
  fetchAxios({
    url: `/comics/${comicId}/characters`,
    params: { ...(nameStartsWith && { nameStartsWith }), limit, offset },
  });

export const loadCharactersByStory = ({
  nameStartsWith = "",
  limit = 20,
  offset = 0,
  storyId,
}) =>
  fetchAxios({
    url: `/stories/${storyId}/characters`,
    params: { ...(nameStartsWith && { nameStartsWith }), limit, offset },
  });
