import { useEffect } from "react"
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../store/hook"
import { GridProps, initialize } from "../store/slices/gameSlice"
import Cell from "./Cell"

const Grid = ({ width, height }: GridProps) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initialize({ height, width }))
    }, [dispatch, height, width])

    const grid = useAppSelector(state => state.game.grid);

    return (
        <Wrapper id="grid" width={grid[0].length} height={grid.length}>
            {
                grid.map((line, lineIndex) =>
                    <Line key={`line-${lineIndex}`}>
                        {
                            line.map((isAlive, colIndex) =>
                                < Cell
                                    id={`cell-${colIndex}-${lineIndex}`}
                                    key={`cell-${colIndex}-${lineIndex}`}
                                    isAlive={isAlive}
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
