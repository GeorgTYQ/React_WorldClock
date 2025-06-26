import styled, {createGlobalStyle,ThemeProvider} from 'styled-components';
import Clock from './components/Clock';


const theme = {
  "primary": "#2270e4",
  "secondary": "#22e4c7",
  "color":{
    "light": "#f0f0f0",
    "dark": "#333",
  },
  "background": {
    "light": "#fff",
    "dark": "#222",
  },
  "text": "#333",
  "border": "#ccc",
  "fontFamily": "'Arial', sans-serif",
}
const backgroundImage  = `linear-gradient(135deg, rgba(113, 163, 230, 0.867) 0%, rgba(34, 228, 199, 0.1) 100%)`;

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 10px;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100dvw;
    min-height: 100dvh;
    font-family: "Orbitron", sans-serif;
    font-size: 2rem;
    text-shadow: 0 3px 5px rgba(0 0 0 / 10%);
    background: ${backgroundImage}
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    list-style: none;
    user-select: none;
    -webkit-user-drag: none;
  }

`
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1200px;
`

const App = () =>{
  return (
    <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Clock city = {'Melbourne'} timezone = {10} light = {false} />
        <Clock city = {'Malaysia'} timezone = {8} light = {false} />
        <Clock city = {'New York'} timezone = {-4} light = {true} />
        <Clock city = {'London'} timezone = {1} light = {true} />

      </Container>

    </ThemeProvider>

    </>


  )
}

export default App;