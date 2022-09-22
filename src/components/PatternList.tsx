import { useDispatch, useSelector } from 'react-redux'
import { List } from '../App'
import gameSlice, { selectSelectedPattern } from '../store/slices/gameSlice'
import { Pattern as PatternType, selectPatterns } from '../store/slices/patternSlice'
import Pattern from './Pattern'

const PatternList = () => {
  const dispatch = useDispatch()
  const patterns = useSelector(selectPatterns)
  const selectedPattern = useSelector(selectSelectedPattern)

  const handlePatternClick = (pattern: PatternType) => {
    dispatch(gameSlice.actions.selectPattern(pattern))
  }

  return (
    <List>
      {
        patterns.map((pattern) =>
          <li key={pattern.id} onClick={() => handlePatternClick(pattern)}>
            <Pattern isSelected={selectedPattern?.id === pattern.id}>
              {pattern.name}
            </Pattern>
          </li>
        )
      }
    </List>
  )
}

export default PatternList
