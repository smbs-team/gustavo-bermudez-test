import { put, takeLatest, select } from "redux-saga/effects";
import { setUIField } from "../actions/main";
import { LOAD_COMICS_SUCCESS } from "../constants/api";
import { SET_ENTITY } from "../constants/entities";

function* processComics(action) {
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
        "comicsList",
        "hasNextPage",
        state.entities.comics.allIds.length < total
      )
    );

    let comics = { ...state.entities.comics } || {
      byId: {},
      allIds: [],
    };

    for (let index = 0; index < results.length; index++) {
      const _comic = results[index];

      comics.byId[_comic.id] = { ..._comic };
      comics.allIds.push(_comic.id);
    }

    yield put({
      type: SET_ENTITY,
      payload: { entity: "comics", value: comics },
    });

    yield put(setUIField("comicsList", "isNextPageLoading", false));
  } catch (error) {
    console.log(error);
  }
}

export default function* comics() {
  yield takeLatest(LOAD_COMICS_SUCCESS, processComics);
}
