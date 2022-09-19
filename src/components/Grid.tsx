import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { Coord, GridProps, initialize, selectGrid, toggleCellState } from "../store/slices/gameSlice"
import Cell from "./Cell"

const Grid = ({ width, height }: GridProps) => {
    const dispatch = useDispatch();
    const grid = useSelector(selectGrid);

    
    function handleCellClick(coord: Coord) {
        dispatch(toggleCellState(coord))
    }
    
    useEffect(() => {
        dispatch(initialize({ width, height }))
    }, [dispatch, height, width])
    
    return (
        <Wrapper id="grid" width={grid[0].length} height={grid.length}>
            {
                grid.map((line, lineIndex) =>
                    <Line key={`line-${lineIndex}`} role="row">
                        {
                            line.map((isAlive, colIndex) =>
                                < Cell
                                    id={`cell-${colIndex}-${lineIndex}`}
                                    key={`cell-${colIndex}-${lineIndex}`}
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

const Wrapper = styled.div`
    width:${({ width }: GridProps) => width * 3}em;
    height:${({ height }: GridProps) => height * 3}em;
    margin: auto;
    margin-bottom: 3em;
    border: solid 1px black
`

const Line = styled.div`
    display: flex
`

export default Grid;
