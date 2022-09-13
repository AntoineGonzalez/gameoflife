import { configureStore } from "@reduxjs/toolkit";
import gameReducer, { GameState } from "./slices/gameSlice";

export type State = {
    game: GameState
}

export const store = configureStore({
    reducer: {
        game: gameReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
