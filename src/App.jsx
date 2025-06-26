import React, { useState } from 'react';
import styled, {createGlobalStyle, ThemeProvider} from 'styled-components';
import Clock from './components/Clock';
import SearchClock from './components/SearchClock';

const theme = {
  "primary": "#2270e4",
  "secondary": "#22e4c7",
  "color":{
    "light": "#f0f0f0",
    "dark": "#333",
  },
  "colorBackground":{ // 修复属性名，匹配Clock组件中使用的名称
    "light": "#fff",
    "dark": "#222",
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

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`

const App = () => {
  // 默认时钟列表
  const [clocks, setClocks] = useState([
    { city: 'Malaysia', timezone: 8 },
    { city: 'New York', timezone: -4 },
    { city: 'London', timezone: 1 }
  ]);

  // 添加新时钟
  const handleAddClock = (city, timezone) => {
    // 检查是否已存在相同城市的时钟
    if (!clocks.some(clock => clock.city === city)) {
      setClocks([...clocks, { city, timezone }]);
    } else {
      alert(` ${city}'s clock already exists.`);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <SearchWrapper>
          <SearchClock onAddClock={handleAddClock} />
        </SearchWrapper>
        <Container>
          {clocks.map((clock, index) => (
            <Clock 
              key={`${clock.city}-${index}`} 
              city={clock.city} 
              timezone={clock.timezone} 
            />
          ))}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;