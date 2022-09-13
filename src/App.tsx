import './App.css'
import styled from 'styled-components'
import Grid from './components/Grid';


function App() {
  return (
    <div className="App">
      <Header>
        Jeu de la vie
      </Header>
      <Grid width={10} height={20} />
    </div>
  );
}

const Header = styled.header`
  margin: 3em auto;
`

export default App;
