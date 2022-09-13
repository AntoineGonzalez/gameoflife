import { combineReducers } from "redux"
import gameReducer, { GameState } from "./gameReducer"

export type State = {
    game: GameState
}

const rootReducer = combineReducers({ game: gameReducer })

export default rootReducer
