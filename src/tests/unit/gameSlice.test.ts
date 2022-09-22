import gameSlice, { GameState } from '../../store/slices/gameSlice'
import gridsFixtures from '../fixtures/grids.json'
import gridPatternsFixtures from '../fixtures/gridPatterns.json'

describe('store/slices/gameSlice', () => {
  it('reduces the initialize action', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
      grid: [[]],
      isRunning: false,
      iterationCounter: 0,
      selectedPattern: null
    }

    const actual = reducer(
      initialState,
      actions.initialize({ width: 5, height: 5 })
    )

    const expected = {
      ...initialState,
      grid: gridsFixtures.initialGrid
    }

    expect(actual).toStrictEqual(expected)
  })

  it('reduces the reviveCell action', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
      grid: gridsFixtures.initialGrid,
      isRunning: false,
      iterationCounter: 0,
      selectedPattern: null
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
      iterationCounter: 0,
      selectedPattern: null
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
      grid: gridsFixtures.initialGrid,
      selectedPattern: null
    }

    const actual = reducer(initialState, actions.startGame())

    const expected = {
      ...initialState,
      isRunning: true
    }

    expect(actual).toStrictEqual(expected)
  })

  it('reduces state to stop the game', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridsFixtures.initialGrid,
      selectedPattern: null
    }

    const actual = reducer(initialState, actions.stopGame())

    const expected = {
      ...initialState,
      isRunning: false
    }

    expect(actual).toStrictEqual(expected)
  })

  test('A dead cell with exactly three alive neighbor revive', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridsFixtures.revivingCondition.initial,
      selectedPattern: null
    }
    const actual = reducer(initialState, actions.tick)

    const expected = {
      ...initialState,
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
      grid: gridsFixtures.revivingCondition.initial,
      selectedPattern: null
    }

    const actual = reducer(initialState, actions.tick)

    const expected = {
      ...initialState,
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
      grid: gridsFixtures.stayAliveCondition.initial,
      selectedPattern: null
    }

    const actual = reducer(initialState, actions.tick)

    const expected = {
      ...initialState,
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
      grid: gridsFixtures.stayAliveCircularCondition.initial,
      selectedPattern: null
    }

    const actual = reducer(initialState, actions.tick)

    const expected = {
      ...initialState,
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
      grid: gridsFixtures.dyingCondition.initial,
      selectedPattern: null
    }

    const actual = reducer(initialState, actions.tick)

    const expected = {
      ...initialState,
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
      grid: gridPatternsFixtures.stableBloc.initial,
      selectedPattern: null
    }

    const actual = reducer(initialState, actions.tick)

    const expected = {
      ...initialState,
      iterationCounter: 1,
      grid: gridPatternsFixtures.stableBloc.expected
    }

    expect(actual).toStrictEqual(expected)
  })

  test('frogOscillator pattern', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridPatternsFixtures.frogOscillator.initial,
      selectedPattern: null
    }

    const actual = reducer(initialState, actions.tick)

    const expected = {
      ...initialState,
      iterationCounter: 1,
      grid: gridPatternsFixtures.frogOscillator.expected
    }

    expect(actual).toStrictEqual(expected)
  })

  test('spaceShip pattern', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridPatternsFixtures.spaceShip.initial,
      selectedPattern: null
    }

    const step1 = reducer(initialState, actions.tick)
    expect(step1).toStrictEqual({
      ...initialState,
      iterationCounter: 1,
      grid: gridPatternsFixtures.spaceShip.step1
    })

    const step2 = reducer(step1, actions.tick)
    expect(step2).toStrictEqual({
      ...initialState,
      iterationCounter: 2,
      grid: gridPatternsFixtures.spaceShip.step2
    })

    const step3 = reducer(step2, actions.tick)
    expect(step3).toStrictEqual({
      ...initialState,
      iterationCounter: 3,
      grid: gridPatternsFixtures.spaceShip.step3
    })

    const step4 = reducer(step3, actions.tick)
    expect(step4).toStrictEqual({
      ...initialState,
      iterationCounter: 4,
      grid: gridPatternsFixtures.spaceShip.step4
    })
  })

  test('cannon pattern', () => {
    const { actions, reducer } = gameSlice

    const initialState: GameState = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridPatternsFixtures.cannon.initial,
      selectedPattern: null
    }

    let actual = initialState

    for (let i = 0; i < 30; i++) {
      actual = reducer(actual, actions.tick)
    }

    expect(actual).toStrictEqual({
      ...initialState,
      iterationCounter: 30,
      grid: gridPatternsFixtures.cannon.expected
    })
  })

  it('reduces the drawPattern action', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridsFixtures.drawSpaceShipPattern.initial,
      selectedPattern: {
        id: 3,
        name: 'Space Ship',
        size: {
          width: 3,
          height: 3
        },
        content: [
          [false, true, false],
          [false, false, true],
          [true, true, true]
        ]
      }
    }

    const actual = reducer(initialState, actions.drawPattern({ x: 1, y: 1 }))

    expect(actual).toStrictEqual({
      ...initialState,
      grid: gridsFixtures.drawSpaceShipPattern.expected
    })
  })

  it('reduces the drawPattern action (circular case)', () => {
    const { actions, reducer } = gameSlice

    const initialState = {
      isRunning: true,
      iterationCounter: 0,
      grid: gridsFixtures.drawSpaceShipPattern.initial,
      selectedPattern: {
        id: 3,
        name: 'Space Ship',
        size: {
          width: 3,
          height: 3
        },
        content: [
          [false, true, false],
          [false, false, true],
          [true, true, true]
        ]
      }
    }

    const actual = reducer(initialState, actions.drawPattern({ x: 4, y: 4 }))

    expect(actual).toStrictEqual({
      ...initialState,
      grid: gridsFixtures.drawSpaceShipPattern.expectedCircular
    })
  })
})
