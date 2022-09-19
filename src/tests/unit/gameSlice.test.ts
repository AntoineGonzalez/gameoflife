import { initialState, gameSlice } from "../../store/slices/gameSlice"

describe('store/slices/gameSlice', () => {
    it('reduces state to initialized a grid with specific width and height', () => {
        const { actions, reducer } = gameSlice
        const width = 20
        const height = 10

        const actual = reducer(initialState, actions.initialize({ width, height }))
        const expected = {
            isRunning: initialState.isRunning,
            iterationCounter: initialState.iterationCounter,
            grid: Array.from(Array(height).keys()).map(() => {
                return Array.from(Array(width).keys()).map(() => false)
            })
        }

        expect(actual).toStrictEqual(expected);
    })

    it('reduces state to toggle a specific cell isAlive properties', () => {
        const { actions, reducer } = gameSlice
        const width = 20
        const height = 10

        const initializeGameState = reducer(initialState, actions.initialize({ width, height }))

        const actual = reducer(initializeGameState, actions.toggleCellState({ x: 14, y: 4 }))

        const expected = {
            ...initializeGameState,
            grid: Array.from(Array(height).keys()).map((lineIndex) => {
                return Array.from(Array(width).keys()).map((colIndex) => (colIndex === 14 && lineIndex === 4) ? true : false)
            })
        }

        expect(actual).toStrictEqual(expected);
    })
})
