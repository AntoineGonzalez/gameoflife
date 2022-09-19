import { configureStore } from '@reduxjs/toolkit'
import gameReducer, { GameState } from './slices/gameSlice'

export type RootState = {
  game: GameState
}

export type Selector<S> = (state: RootState) => S

export const store = configureStore({
  reducer: {
    game: gameReducer
  }
})
