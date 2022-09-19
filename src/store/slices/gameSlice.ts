import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Selector } from "../store";

export type GameState = {
    grid: boolean[][];
    isRunning: boolean;
    iterationCounter: number;
}

export type GridProps = {
    width: number;
    height: number;
}

export type Coord = {
    x: number,
    y: number
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
        toggleCellState: (state, action: PayloadAction<Coord>) => {
            return {
                ...state,
                grid: state.grid.map((line, lineIndex) =>
                    line.map((isAlive, colIndex) =>
                        (colIndex === action.payload.x && lineIndex === action.payload.y) ? !isAlive : isAlive
                    )
                )
            }
        }
    }
})

export const { initialize, toggleCellState } = gameSlice.actions
export const selectGrid: Selector<boolean[][]> = state => state.game.grid

export default gameSlice.reducer;
