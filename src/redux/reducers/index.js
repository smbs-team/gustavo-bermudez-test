import { combineReducers } from "redux"
import favorites from "./modules/favorites"
import ui from "./modules/ui"
import entities from "./modules/entities"

const createRootReducer = () =>
  combineReducers({
    favorites,
    ui,
    entities
  })

export default createRootReducer
