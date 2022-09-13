import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GameState = {
    grid: boolean[][];
    state: boolean;
    iterationCounter: number;
}

export type GridProps = {
    width: number;
    height: number;
}

const initialState: GameState = {
    grid: [[]],
    state: false,
    iterationCounter: 0
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
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

export const { initialize } = gameSlice.actions
export default gameSlice.reducer;
