import { SET_FAVORITE } from "../constants/favorites";
import makeActionCreator from "../makeActionCreator";

export const setFavorite = makeActionCreator(
  SET_FAVORITE,
  "key",
  "id",
  "value"
);
