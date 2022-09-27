import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import gameSlice, { Coord, GridProps, selectGrid, selectIsRunning, selectUserPattern } from '../store/slices/gameSlice'
import Cell from './Cell'

const Grid = ({ width, height }: GridProps) => {
  const dispatch = useDispatch()
  const grid = useSelector(selectGrid)
  const gameIsRunning = useSelector(selectIsRunning)
  const selectedPattern = useSelector(selectUserPattern)

  function handleCellClick (coord: Coord) {
    if (gameIsRunning) {
      return
    }

    if (selectedPattern !== null) {
      dispatch(gameSlice.actions.drawPattern(coord))
      return
    }

    if (grid[coord.y][coord.x]) {
      dispatch(gameSlice.actions.killCell(coord))
      return
    }

    dispatch(gameSlice.actions.reviveCell(coord))
  }

  useEffect(() => {
    dispatch(gameSlice.actions.initialize({ width, height }))
  }, [dispatch, height, width])

  return (
    <Wrapper id="grid" width={grid[0].length} height={grid.length} isRunning={gameIsRunning}>
      {
        grid.map((line, lineIndex) =>
          <Line key={`line-${lineIndex}`} role="row">
            {
              line.map((isAlive, colIndex) =>
                <Cell
                  id={`cell-${colIndex}-${lineIndex}`}
                  key={`cell-${colIndex}-${lineIndex}`}
                  gridWidth={grid[0].length}
                  gridHeight={grid.length}
                  isAlive={isAlive}
                  onClick={() => handleCellClick({ x: colIndex, y: lineIndex })}
                  role="gridcell"
                />
              )
            }
          </Line>
        )
      }
    </Wrapper>
  )
}

type WrapperProps = {
  isRunning: boolean
  width: number
  height: number
}

const Wrapper = styled.div<WrapperProps>`
  margin: auto;
  margin-bottom: 1.5em;
  border: solid 1px black;
  &:hover {
    cursor: ${({ isRunning }) => isRunning ? 'inherit' : 'pointer'};
  }
`

const Line = styled.div`
  display: flex
`

export default Grid
