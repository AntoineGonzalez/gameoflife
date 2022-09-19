import { initialState, gameSlice } from '../../store/slices/gameSlice'
import gridsFixtures from '../fixtures/grids.json'

describe('store/slices/gameSlice', () => {
  it('reduces state to initialized a grid with specific width and height', () => {
    const { actions, reducer } = gameSlice
    const width = 4
    const height = 4

    const actual = reducer(initialState, actions.initialize({ width, height }))
    const expected = {
      isRunning: false,
      iterationCounter: 0,
      grid: gridsFixtures.initialGrid
    }

    expect(actual).toStrictEqual(expected)
  })

  it('reduces state to revive a specific cell', () => {
    const { actions, reducer } = gameSlice
    const width = 4
    const height = 4

    const initializeGameState = reducer(initialState, actions.initialize({ width, height }))
    const actual = reducer(initializeGameState, actions.reviveCell({ x: 1, y: 1 }))

    const expected = {
      ...initializeGameState,
      grid: gridsFixtures.gridRevivedCell
    }

    expect(actual).toStrictEqual(expected)
  })

  it('reduces state to kill a specific cell', () => {
    const { actions, reducer } = gameSlice
    const width = 4
    const height = 4

    const initializeGameState = reducer(initialState, actions.initialize({ width, height }))
    reducer(initializeGameState, actions.reviveCell({ x: 4, y: 4 }))

    const actual = reducer(initializeGameState, actions.killCell({ x: 4, y: 4 }))
    const expected = {
      ...initializeGameState,
      grid: gridsFixtures.initialGrid
    }

    expect(actual).toStrictEqual(expected)
  })
})
