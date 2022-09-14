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
    x: number;
    y: number;
}

const initialState: GameState = {
    grid: [[]],
    isRunning: false,
    iterationCounter: 0
}

function getNeighboursValue(state: GameState, { x, y }: Coord): Boolean[] {
    const gridWidth = state.grid[0].length
    const gridHeight = state.grid.length

    const northIndex = y > 0
        ? y - 1
        : gridHeight - 1
    const southIndex = y < gridHeight - 1
        ? y + 1
        : 0
    const westIndex = x > 0
        ? x - 1
        : gridWidth - 1
    const eastIndex = x < gridHeight - 1
        ? x + 1
        : 0

    return [
        state.grid[northIndex][westIndex],
        state.grid[northIndex][x],
        state.grid[northIndex][eastIndex],
        state.grid[y][westIndex],
        state.grid[y][eastIndex],
        state.grid[southIndex][westIndex],
        state.grid[southIndex][x],
        state.grid[southIndex][eastIndex],
    ]
}

function computeIteration(state: GameState): GameState {
    return {
        ...state,
        iterationCounter: state.iterationCounter + 1,
        grid: state.grid.map((line, lineIndex) =>
            line.map((cellIsAlive, colIndex) => {
                const alivedNeighboursCount = getNeighboursValue(
                    state,
                    {
                        x: colIndex,
                        y: lineIndex
                    }
                ).filter((value) => value).length;

                if ((!cellIsAlive && alivedNeighboursCount === 3) ||
                    (cellIsAlive && [2, 3].includes(alivedNeighboursCount))
                ) {
                    return true;
                }

                return false;
            })
        )
    }
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        tick: (state) => {
            return {
                ...computeIteration(state),
            }
        },
        toggleRunningStatus: (state) => {
            return {
                ...state,
                isRunning: !state.isRunning
            }
        },
        initialize: (state, action: PayloadAction<GridProps>) => {
            return {
                ...state,
                grid: Array.from(Array(action.payload.width).keys()).map(() => {
                    return Array.from(Array(action.payload.height).keys()).map(() => Math.random() < 0.5)
                })
            }
        }
    }
})

export const { initialize, tick, toggleRunningStatus } = gameSlice.actions
export const selectGrid: Selector<boolean[][]> = state => state.game.grid
export const selectGameState: Selector<GameState> = state => state.game

export default gameSlice.reducer;
