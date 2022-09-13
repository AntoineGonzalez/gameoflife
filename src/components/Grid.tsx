import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { GridProps } from "../store/reducers/gameReducer"
import { State } from "../store/reducers/rootReducer"
import Cell from "./Cell"

const Grid = ({ width, height }: GridProps) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'grid/initialize', payload: {
                width: width, height: height
            }
        })
    }, [dispatch, height, width])

    const grid = useSelector((state: State) => state.game.grid)
    console.log(grid)

    return (
        <>
            <Wrapper id="grid" width={grid[0].length} height={grid.length}>
                {
                    grid.map((line, lineIndex) =>
                        <Line key={`line-${lineIndex}`}>
                            {
                                line.map((value, colIndex) =>
                                    < Cell
                                        id={`cell-${colIndex}-${lineIndex}`}
                                        key={`cell-${colIndex}-${lineIndex}`}
                                        isAlive={value}
                                    />
                                )
                            }
                        </Line>
                    )
                }
            </Wrapper>
        </>
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
