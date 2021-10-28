import { all } from "redux-saga/effects";
import characters from "./characters";
import comics from "./comics";
import stories from "./stories";

const sagasArray = [characters(), comics(), stories()];

export default function* rootSaga() {
  yield all(sagasArray);
}
