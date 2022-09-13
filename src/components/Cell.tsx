import styled from "styled-components"
type Props = {
    isAlive: boolean;
}

const Cell = styled.div<Props>`
    width:3em;
    height:3em;
    margin:auto;
    border: 1px solid black;
    box-sizing: border-box;
    background-color: ${(props) => props.isAlive ? 'white' : 'grey'}
`

export default Cell
