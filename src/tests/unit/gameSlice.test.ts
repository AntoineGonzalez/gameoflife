import gameSlice from '../../store/slices/gameSlice'
import gridsFixtures from '../fixtures/grids.json'
import gridPatternFixtures from '../fixtures/patterns.json'

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

  test('stableBloc pattern', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridPatternFixtures.stableBloc.initial
    }

    const actual = reducer(initialState, actions.tick)

    const expected = {
      isRunning: true,
      iterationCounter: 1,
      grid: gridPatternFixtures.stableBloc.expected
    }

    expect(actual).toStrictEqual(expected)
  })

  test('frogOscillator pattern', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridPatternFixtures.frogOscillator.initial
    }

    const actual = reducer(initialState, actions.tick)

    const expected = {
      isRunning: true,
      iterationCounter: 1,
      grid: gridPatternFixtures.frogOscillator.expected
    }

    expect(actual).toStrictEqual(expected)
  })

  test('spaceShip pattern', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridPatternFixtures.spaceShip.initial
    }

    const step1 = reducer(initialState, actions.tick)
    expect(step1).toStrictEqual({
      isRunning: true,
      iterationCounter: 1,
      grid: gridPatternFixtures.spaceShip.step1
    })

    const step2 = reducer(step1, actions.tick)
    expect(step2).toStrictEqual({
      isRunning: true,
      iterationCounter: 2,
      grid: gridPatternFixtures.spaceShip.step2
    })

    const step3 = reducer(step2, actions.tick)
    expect(step3).toStrictEqual({
      isRunning: true,
      iterationCounter: 3,
      grid: gridPatternFixtures.spaceShip.step3
    })

    const step4 = reducer(step3, actions.tick)
    expect(step4).toStrictEqual({
      isRunning: true,
      iterationCounter: 4,
      grid: gridPatternFixtures.spaceShip.step4
    })
  })

  test('cannon pattern', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridPatternFixtures.cannon.initial
    }

    let actual = initialState

    for (let i = 0; i < 30; i++) {
      actual = reducer(actual, actions.tick)
    }

    expect(actual).toStrictEqual({
      isRunning: true,
      iterationCounter: 30,
      grid: gridPatternFixtures.cannon.expected
    })
  })
})
