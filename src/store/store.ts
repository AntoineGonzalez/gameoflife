import { configureStore } from '@reduxjs/toolkit'
import gameSlice, { GameState } from './slices/gameSlice'
import patternsSlice, { Pattern } from './slices/patternSlice'

export type RootState = {
  game: GameState
  patterns: Pattern[]
}

export type Selector<S> = (state: RootState) => S

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
    patterns: patternsSlice.reducer
  }
})
