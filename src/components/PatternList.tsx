import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { List } from '../App'
import patterns from '../data/patterns'
import gameSlice, { Pattern, selectUserPattern } from '../store/slices/gameSlice'

const PatternList = () => {
  const dispatch = useDispatch()
  const selectedPattern = useSelector(selectUserPattern)

  const handlePatternClick = (pattern: Pattern) => {
    dispatch(gameSlice.actions.selectPattern(pattern))
  }

  return (
    <List>
      {
        patterns.map((pattern) =>
          <PatternOption
            key={pattern.id}
            role="option"
            aria-selected={selectedPattern?.id === pattern.id}
            onClick={() => handlePatternClick(pattern)}
          >
              {pattern.name}
          </PatternOption>
        )
      }
    </List>
  )
}

const PatternOption = styled.li`
  border: 1px solid black;
  box-sizing: border-box;
  margin-bottom:0.5em;
  padding: 1em;
  &[aria-selected="true"]{
    color: red;
    border-color: red;
  }
  &:hover{
    cursor: pointer
  }
`

export default PatternList
