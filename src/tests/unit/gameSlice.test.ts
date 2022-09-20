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

  it('reduces state to start the game', () => {
    const { actions, reducer } = gameSlice

    const initialGameState = {
      isRunning: false,
      iterationCounter: 0,
      grid: gridsFixtures.initialGrid
    }

    const actual = reducer(initialGameState, actions.startGame())
    const expected = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridsFixtures.initialGrid
    }

    expect(actual).toStrictEqual(expected)
  })

  it('reduces state to stop the game', () => {
    const { actions, reducer } = gameSlice

    const initialGameState = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridsFixtures.initialGrid
    }

    const actual = reducer(initialGameState, actions.stopGame())
    const expected = {
      isRunning: false,
      iterationCounter: 0,
      grid: gridsFixtures.initialGrid
    }

    expect(actual).toStrictEqual(expected)
  })

  test('A dead cell with exactly three alive neighbor revive', () => {
    const { actions, reducer } = gameSlice
    const initialGameState = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridsFixtures.revivingCondition.initial
    }
    const actual = reducer(initialGameState, actions.tick)

    const expected = {
      isRunning: true,
      iterationCounter: 1,
      grid: gridsFixtures.revivingCondition.expected
    }

    expect(actual).toStrictEqual(expected)
  })

  test('A dead cell with exactly three alive neighbor revive (circular case)', () => {
    const { actions, reducer } = gameSlice
    const initialGameState = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridsFixtures.revivingCondition.initial
    }
    const actual = reducer(initialGameState, actions.tick)

    const expected = {
      isRunning: true,
      iterationCounter: 1,
      grid: gridsFixtures.revivingCondition.expected
    }

    expect(actual).toStrictEqual(expected)
  })

  test('A living cell with two or three alive neighbor stay alive', () => {
    const { actions, reducer } = gameSlice
    const initialGameState = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridsFixtures.stayAliveCondition.initial
    }
    const actual = reducer(initialGameState, actions.tick)

    const expected = {
      isRunning: true,
      iterationCounter: 1,
      grid: gridsFixtures.stayAliveCondition.expected
    }

    expect(actual).toStrictEqual(expected)
  })

  test('A living cell with two or three alive neighbor stay alive (circular case)', () => {
    const { actions, reducer } = gameSlice
    const initialGameState = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridsFixtures.stayAliveCircularCondition.initial
    }
    const actual = reducer(initialGameState, actions.tick)

    const expected = {
      isRunning: true,
      iterationCounter: 1,
      grid: gridsFixtures.stayAliveCircularCondition.expected
    }

    expect(actual).toStrictEqual(expected)
  })

  test('A living cell without exactly two or three alive neighbor die', () => {
    const { actions, reducer } = gameSlice
    const initialGameState = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridsFixtures.dyingCondition.initial
    }
    const actual = reducer(initialGameState, actions.tick)

    const expected = {
      isRunning: true,
      iterationCounter: 1,
      grid: gridsFixtures.dyingCondition.expected
    }

    expect(actual).toStrictEqual(expected)
  })
})
