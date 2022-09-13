import { combineReducers } from "redux"
import gameReducer from "./gameReducer"

const rootReducer = combineReducers({ grid: gameReducer })

export default rootReducer
