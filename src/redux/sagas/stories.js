import { put, takeLatest, select } from "redux-saga/effects";
import { setUIField } from "../actions/main";
import { LOAD_STORIES_SUCCESS } from "../constants/api";
import { SET_ENTITY } from "../constants/entities";

function* processStories(action) {
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
        "storiesList",
        "hasNextPage",
        state.entities.stories.allIds.length < total
      )
    );

    let stories = { ...state.entities.stories } || {
      byId: {},
      allIds: [],
    };

    for (let index = 0; index < results.length; index++) {
      const _story = results[index];

      stories.byId[_story.id] = { ..._story };
      stories.allIds.push(_story.id);
    }

    yield put({
      type: SET_ENTITY,
      payload: { entity: "stories", value: stories },
    });

    yield put(setUIField("storiesList", "isNextPageLoading", false));
  } catch (error) {
    console.log(error);
  }
}

export default function* stories() {
  yield takeLatest(LOAD_STORIES_SUCCESS, processStories);
}
