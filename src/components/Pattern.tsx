import styled from 'styled-components'

type Props = {
  isSelected: boolean
}

const Pattern = styled.div<Props>`
  border: 1px solid ${({ isSelected }) => isSelected ? 'red' : 'black'};
  color: ${({ isSelected }) => isSelected ? 'red' : 'black'};
  box-sizing: border-box;
  margin-bottom:0.5em;
  padding: 1em;
  &:hover{
    cursor: pointer
  }
`

export default Pattern
