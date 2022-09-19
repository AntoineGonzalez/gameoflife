import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Selector } from '../store'

export type GameState = {
  grid: boolean[][]
  isRunning: boolean
  iterationCounter: number
}

export type GridProps = {
  width: number
  height: number
}

export type Coord = {
  x: number
  y: number
}

const setCellIsAlive = (state: GameState, coord: Coord, value: boolean) => {
  return {
    ...state,
    grid: state.grid.map((line, lineIndex) =>
      line.map((isAlive, colIndex) =>
        (colIndex === coord.x && lineIndex === coord.y) ? value : isAlive
      )
    )
  }
}

export const initialState: GameState = {
  grid: [[]],
  isRunning: false,
  iterationCounter: 0
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initialize: (state, action: PayloadAction<GridProps>) => {
      return {
        ...state,
        grid: Array.from(Array(action.payload.height).keys()).map(() => {
          return Array.from(Array(action.payload.width).keys()).map(() => false)
        })
      }
    },
    reviveCell: (state, action: PayloadAction<Coord>) => {
      return setCellIsAlive(state, action.payload, true)
    },
    killCell: (state, action: PayloadAction<Coord>) => {
      return setCellIsAlive(state, action.payload, false)
    }
  }
})

export const {
  initialize,
  killCell,
  reviveCell
} = gameSlice.actions

export const selectGrid: Selector<boolean[][]> = state => state.game.grid
export default gameSlice.reducer
