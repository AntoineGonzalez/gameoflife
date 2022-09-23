import './App.css'
import styled from 'styled-components'
import Grid from './components/Grid'
import gameSlice, { selectIsRunning, selectIterationCounter } from './store/slices/gameSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PatternList from './components/PatternList'
import useDebounce from './hooks/useDebounce'

function App () {
  const dispatch = useDispatch()
  const gameIsRunning = useSelector(selectIsRunning)
  const iterationCounter = useSelector(selectIterationCounter)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
  const [widthInput, setWidthInput] = useState(50)
  const [heightInput, setHeightInput] = useState(50)
  const [width, setWidth] = useState(50)
  const [height, setHeight] = useState(50)

  useEffect(() => {
    if (gameIsRunning) {
      const id = setInterval(
        () => dispatch(gameSlice.actions.tick()),
        500
      )

      setIntervalId(id)
    } else if (intervalId !== null) {
      clearInterval(intervalId)
      setIntervalId(null)
    }

    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId)
      }
    }
  }, [gameIsRunning])

  useDebounce(() => {
    setWidthInput(validateWidth(widthInput))
    setHeightInput(validateHeight(heightInput))
    setWidth(validateWidth(widthInput))
    setHeight(validateHeight(heightInput))
  }, 500, [widthInput, heightInput])

  function handleStarGame () {
    dispatch(gameSlice.actions.startGame())
  }

  function handleClearGame () {
    dispatch(gameSlice.actions.clearGame())
  }

  function handleStopGame () {
    dispatch(gameSlice.actions.stopGame())
  }

  const handleWidthChange = (newWidth: number) => {
    setWidthInput(isNaN(newWidth) ? 0 : newWidth)
  }

  const handleHeightChange = (newHeight: number) => {
    setHeightInput(isNaN(newHeight) ? 0 : newHeight)
  }

  const validateDimension = (dimension: number) => {
    if (dimension < 4) {
      return 4
    }

    if (dimension > 100) {
      return 100
    }

    return dimension
  }

  const validateWidth = (widthInput: number) => {
    return validateDimension(widthInput)
  }

  const validateHeight = (heightInput: number) => {
    return validateDimension(heightInput)
  }

  return (
    <AppContainer>
      <Aside>
        <Header>
          Jeu de la vie
        </Header>
        <ScaleFieldset>
          <legend>Dimensions</legend>
          <input
            data-testid="grid-width-input"
            type="number"
            value={widthInput}
            step='1'
            min='4'
            max='100'
            onChange={
              (event) => handleWidthChange(parseInt(event.target.value))
            }
          />
          <ScaleSeparator>x</ScaleSeparator>
          <input
            data-testid="grid-height-input"
            type="number"
            value={heightInput}
            step='1'
            min='4'
            max='100'
            onChange={
              (event) => handleHeightChange(parseInt(event.target.value))
            }
          />
        </ScaleFieldset>
        <List>
          <li>Nombre d&apos;itérations : {iterationCounter}</li>
          <li>
            <Button onClick={handleClearGame} role="button">
              Reset
            </Button>
          </li>
          <li>
            <Button onClick={gameIsRunning ? handleStopGame : handleStarGame} role="button">
              {gameIsRunning ? 'Stop' : 'Start'}
            </Button>
          </li>
        </List>
        <PatternList></PatternList>
      </Aside>
      <Container>
        <Grid width={width} height={height} />
      </Container>
    </AppContainer>
  )
}

const Container = styled.div`
  margin: 1.5em;
  min-height: 100vh;
`
const Header = styled.header`
  margin-bottom: 1.5em;
  padding: 1em;
  border-bottom: solid 1px grey;
`
const AppContainer = styled.div`
  display: flex;
`
const Aside = styled.aside`
  width: 300px;
  text-align: center;
  border-right: solid 1px grey;
`
const ScaleSeparator = styled.span`
  margin: 0 1em;
`
const ScaleFieldset = styled.fieldset`
  border: none;
  padding-top: 1em;
  margin-bottom: 1em;
`
export const List = styled.ul`
  list-style-type: none;
  padding: 1em;
  margin: 0 0 1em 0em;
`
const Button = styled.button`
  margin-top: 1em
`
export default App
