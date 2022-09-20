import gameSlice from '../../store/slices/gameSlice'
import gridsFixtures from '../fixtures/grids.json'

describe('store/slices/gameSlice', () => {
  it('reduces the initialize action', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
      grid: [[]],
      isRunning: false,
      iterationCounter: 0
    }

    const actual = reducer(
      initialState,
      actions.initialize({ width: 5, height: 5 })
    )

    const expected = {
      isRunning: false,
      iterationCounter: 0,
      grid: gridsFixtures.initialGrid
    }

    expect(actual).toStrictEqual(expected)
  })

  it('reduces the reviveCell action', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
      grid: gridsFixtures.initialGrid,
      isRunning: false,
      iterationCounter: 0
    }

    const actual = reducer(initialState, actions.reviveCell({ x: 1, y: 1 }))

    const expected = {
      ...initialState,
      grid: gridsFixtures.gridRevivedCell
    }

    expect(actual).toStrictEqual(expected)
  })

  it('reduces the killCell action', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
      grid: gridsFixtures.gridRevivedCell,
      isRunning: false,
      iterationCounter: 0
    }

    const actual = reducer(initialState, actions.killCell({ x: 1, y: 1 }))

    const expected = {
      ...initialState,
      grid: gridsFixtures.initialGrid
    }

    expect(actual).toStrictEqual(expected)
  })
})
