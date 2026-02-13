import styled from 'styled-components'
type Props = {
  isAlive: boolean
  gridWidth: number
  gridHeight: number
}

const Cell = styled.div<Props>`
  width: ${({ gridWidth, gridHeight }) => 900 / Math.max(gridWidth, gridHeight)}px;
  height: ${({ gridWidth, gridHeight }) => 900 / Math.max(gridWidth, gridHeight)}px;
  margin: auto;
  border: 1px solid black;
  box-sizing: border-box;
  background-color: ${({ isAlive }) => isAlive ? 'white' : 'grey'};
`

export default Cell
