export type GridProps = {
    width: number;
    height: number;
}

export type GameState = {
    grid: boolean[][];
    state: boolean;
    iterationCounter: number;
}

const initalState: GameState = {
    grid: [[]],
    state: false,
    iterationCounter: 0
}

function initializeGrid({ width, height }: GridProps): GameState {
    return {
        ...initalState,
        grid: Array.from(Array(width).keys()).map(() => {
            return Array.from(Array(height).keys()).map(() => Math.random() < 0.5)
        })
    }
}

enum Actions {
    INIT = "grid/initialize"
}

type GameAction =
    | { type: Actions.INIT, payload: GridProps }

function gameReducer(state = initalState, action: GameAction): GameState {
    switch (action.type) {
        case Actions.INIT:
            return initializeGrid(action.payload)
        default:
            return state
    }
}

export default gameReducer

