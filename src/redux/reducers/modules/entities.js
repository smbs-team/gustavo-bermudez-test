import {
  LOAD_CHARACTER_BY_ID_SUCCESS,
  LOAD_COMIC_BY_ID_SUCCESS,
  LOAD_STORY_BY_ID_SUCCESS,
} from "../../constants/api";
import { SET_ENTITY, CLEAR_ENTITY } from "../../constants/entities";

const initialState = {
  characters: {
    byId: {},
    allIds: [],
  },
  comics: {
    byId: {},
    allIds: [],
  },
  stories: {
    byId: {},
    allIds: [],
  },
  selectedComic: null,
  selectedCharacter: null,
  selectedStory: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ENTITY: {
      const { entity, value } = action.payload;

      return {
        ...state,
        [entity]: value,
      };
    }

    case CLEAR_ENTITY: {
      const { entity } = action.payload;

      return {
        ...state,
        [entity]: { byId: {}, allIds: [] },
      };
    }

    case LOAD_COMIC_BY_ID_SUCCESS: {
      const {
        data: {
          data: {
            results: [_comic],
          },
        },
      } = action.payload;

      return {
        ...state,
        selectedComic: _comic,
      };
    }

    case LOAD_CHARACTER_BY_ID_SUCCESS: {
      const {
        data: {
          data: {
            results: [_character],
          },
        },
      } = action.payload;

      return {
        ...state,
        selectedCharacter: _character,
      };
    }

    case LOAD_STORY_BY_ID_SUCCESS: {
      const {
        data: {
          data: {
            results: [_story],
          },
        },
      } = action.payload;

      return {
        ...state,
        selectedStory: _story,
      };
    }

    default:
      return state;
  }
};

export default reducer;
