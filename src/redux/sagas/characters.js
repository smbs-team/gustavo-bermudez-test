import { put, takeLatest, select } from "redux-saga/effects";
import { setUIField } from "../actions/main";
import { LOAD_CHARACTERS_SUCCESS } from "../constants/api";
import { SET_ENTITY } from "../constants/entities";

function* processCharacters(action) {
  const {
    payload: {
      data: {
        data: { results, total },
      },
    },
  } = action;

  try {
    const state = yield select();

    yield put(
      setUIField(
        "charactersList",
        "hasNextPage",
        state.entities.characters.allIds.length < total
      )
    );

    let characters = { ...state.entities.characters } || {
      byId: {},
      allIds: [],
    };
    let byComics = { byId: {}, allIds: [] };
    let byStories = { byId: {}, allIds: [] };

    for (let index = 0; index < results.length; index++) {
      const { comics, events, series, stories, ..._character } = results[index];

      characters.byId[_character.id] = { ..._character };
      characters.allIds.push(_character.id);

      for (const _comic of comics.items) {
        const _id = _comic.resourceURI.slice(
          _comic.resourceURI.lastIndexOf("/") + 1
        );

        if (Object.prototype.hasOwnProperty.call(byComics.byId, _id)) {
          byComics.byId[_id] = {
            name: _comic.name,
            charactersIds: [...byComics.byId[_id].charactersIds, _character.id],
          };
        } else {
          byComics = {
            byId: {
              ...byComics.byId,
              [_id]: {
                name: _comic.name,
                charactersIds: [_character.id],
              },
            },
            allIds: [...byComics.allIds, _id],
          };
        }
      }

      for (const _story of stories.items) {
        const _id = _story.resourceURI.slice(
          _story.resourceURI.lastIndexOf("/") + 1
        );

        if (Object.prototype.hasOwnProperty.call(byStories.byId, _id)) {
          byStories.byId[_id] = {
            name: _story.name,
            charactersIds: [
              ...byStories.byId[_id].charactersIds,
              _character.id,
            ],
          };
        } else {
          byStories = {
            byId: {
              ...byStories.byId,
              [_id]: {
                name: _story.name,
                charactersIds: [_character.id],
              },
            },
            allIds: [...byStories.allIds, _id],
          };
        }
      }
    }

    console.log(characters);

    yield put({
      type: SET_ENTITY,
      payload: { entity: "characters", value: characters },
    });

    yield put(setUIField("charactersList", "isNextPageLoading", false));
  } catch (error) {
    console.log(error);
  }
}

export default function* characters() {
  yield takeLatest(LOAD_CHARACTERS_SUCCESS, processCharacters);
}
