import gameSlice from '../../store/slices/gameSlice'
import gridsFixtures from '../fixtures/grids.json'

describe('store/slices/gameSlice', () => {
  it('reduces state to initialized a grid with specific width and height', () => {
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

  it('reduces state to revive a specific cell', () => {
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

  it('reduces state to kill a specific cell', () => {
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

  it('reduces state to start the game', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
      isRunning: false,
      iterationCounter: 0,
      grid: gridsFixtures.initialGrid
    }

    const actual = reducer(initialState, actions.startGame())

    const expected = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridsFixtures.initialGrid
    }

    expect(actual).toStrictEqual(expected)
  })

  it('reduces state to stop the game', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridsFixtures.initialGrid
    }

    const actual = reducer(initialState, actions.stopGame())

    const expected = {
      isRunning: false,
      iterationCounter: 0,
      grid: gridsFixtures.initialGrid
    }

    expect(actual).toStrictEqual(expected)
  })

  test('A dead cell with exactly three alive neighbor revive', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridsFixtures.revivingCondition.initial
    }
    const actual = reducer(initialState, actions.tick)

    const expected = {
      isRunning: true,
      iterationCounter: 1,
      grid: gridsFixtures.revivingCondition.expected
    }

    expect(actual).toStrictEqual(expected)
  })

  test('A dead cell with exactly three alive neighbor revive (circular case)', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridsFixtures.revivingCondition.initial
    }

    const actual = reducer(initialState, actions.tick)

    const expected = {
      isRunning: true,
      iterationCounter: 1,
      grid: gridsFixtures.revivingCondition.expected
    }

    expect(actual).toStrictEqual(expected)
  })

  test('A living cell with two or three alive neighbor stay alive', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridsFixtures.stayAliveCondition.initial
    }

    const actual = reducer(initialState, actions.tick)

    const expected = {
      isRunning: true,
      iterationCounter: 1,
      grid: gridsFixtures.stayAliveCondition.expected
    }

    expect(actual).toStrictEqual(expected)
  })

  test('A living cell with two or three alive neighbor stay alive (circular case)', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridsFixtures.stayAliveCircularCondition.initial
    }

    const actual = reducer(initialState, actions.tick)

    const expected = {
      isRunning: true,
      iterationCounter: 1,
      grid: gridsFixtures.stayAliveCircularCondition.expected
    }

    expect(actual).toStrictEqual(expected)
  })

  test('A living cell without exactly two or three alive neighbor die', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridsFixtures.dyingCondition.initial
    }

    const actual = reducer(initialState, actions.tick)

    const expected = {
      isRunning: true,
      iterationCounter: 1,
      grid: gridsFixtures.dyingCondition.expected
    }

    expect(actual).toStrictEqual(expected)
  })
})
