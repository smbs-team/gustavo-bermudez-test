import { SET_UI_FIELD } from "../constants/main";
import makeActionCreator from "../makeActionCreator";

export const setUIField = makeActionCreator(SET_UI_FIELD, "key", "field", "value");
