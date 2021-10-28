import { SET_FAVORITE } from "../../constants/favorites";

const initialState = {
  characters: {},
  comics: {},
  series: {},
  stories: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FAVORITE: {
      const { key, id, value } = action.payload;

      let newState = { ...state[key] };
      const exists = Object.prototype.hasOwnProperty.call(newState, id);

      if (exists) delete newState[id];
      else newState[id] = value;

      return {
        ...state,
        [key]: newState,
      };
    }

    default:
      return state;
  }
};

export default reducer;
