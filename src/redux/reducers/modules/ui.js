import { SET_UI_FIELD } from "../../constants/main"

const initialState = {
  charactersList: {
    key: "charactersList",
    searchValue: "",
    hasNextPage: true,
    isNextPageLoading: false,
    orderBy: "name",
  },
  comicsList: {
    key: "comicsList",
    hasNextPage: true,
    isNextPageLoading: false,
    filterBy: "",
    filterValue: "",
    orderBy: "",
  },
  storiesList: {
    key: "storiesList",
    hasNextPage: true,
    isNextPageLoading: false,
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_UI_FIELD: {
      const { key, field, value } = action.payload

      return {
        ...state,
        [key]: {
          ...state[key],
          [field]: value,
        },
      }
    }

    default:
      return state
  }
}

export default reducer
