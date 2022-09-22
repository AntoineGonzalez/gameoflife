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

export const initialState: GameState = {
  grid: [[]],
  isRunning: false,
  iterationCounter: 0
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

const getCellNeighboursValues = (grid: boolean[][], { x, y }: Coord) => {
  const gridWidth = grid[0].length
  const gridHeight = grid.length

  const northIndex = y > 0
    ? y - 1
    : gridHeight - 1
  const southIndex = y < gridHeight - 1
    ? y + 1
    : 0
  const westIndex = x > 0
    ? x - 1
    : gridWidth - 1
  const eastIndex = x < gridWidth - 1
    ? x + 1
    : 0

  return [
    grid[northIndex][westIndex],
    grid[northIndex][x],
    grid[northIndex][eastIndex],
    grid[y][westIndex],
    grid[y][eastIndex],
    grid[southIndex][westIndex],
    grid[southIndex][x],
    grid[southIndex][eastIndex]
  ]
}

function computeNextGrid (grid: boolean[][]): boolean[][] {
  return grid.map((line, lineIndex) =>
    line.map((cellIsAlive, colIndex) => {
      const alivedNeighboursCount = getCellNeighboursValues(
        grid,
        {
          x: colIndex,
          y: lineIndex
        }
      ).filter((isAlive) => isAlive).length

      if ((!cellIsAlive && alivedNeighboursCount === 3) ||
          (cellIsAlive && [2, 3].includes(alivedNeighboursCount))
      ) {
        return true
      }

      return false
    })
  )
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    tick: (state) => ({
      ...state,
      iterationCounter: state.iterationCounter + 1,
      grid: computeNextGrid(state.grid)
    }),
    stopGame: (state) => ({
      ...state,
      isRunning: false
    }),
    startGame: (state) => ({
      ...state,
      isRunning: true
    }),
    initialize: (state, action: PayloadAction<GridProps>) => ({
      ...state,
      grid: Array.from(Array(action.payload.height).keys()).map(() => {
        return Array.from(Array(action.payload.width).keys()).map(() => false)
      })
    }),
    reviveCell: (state, action: PayloadAction<Coord>) => setCellIsAlive(state, action.payload, true),
    killCell: (state, action: PayloadAction<Coord>) => setCellIsAlive(state, action.payload, false)
  }
})

export const selectGrid: Selector<boolean[][]> = state => state.game.grid
export const selectGameState: Selector<GameState> = state => state.game
export const selectIsRunning: Selector<boolean> = state => state.game.isRunning
export const selectIterationCounter: Selector<number> = state => state.game.iterationCounter

export default gameSlice
