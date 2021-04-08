
import React, {useState} from "react";
import {
  ThemeProvider,
  createGlobalStyle
} from 'styled-components';

const GlobalStyle = createGlobalStyle`
body {
  background-color: ${props =>
    props.theme.mode === 'dark' ? '#111' : '#EEE'};
  color: ${props =>
    props.theme.mode === 'dark' ? '#111' : '#EEE'};
  background: ${props =>
    props.theme.mode === 'dark' ? '#111' : ""};
}
`;

export const Dark = () => {
  const [theme, setTheme] = useState({ mode : 'light'})
  return (
    <ThemeProvider theme={theme}>
    <> 
      <GlobalStyle />
      <div className="container">
        <p> Click me for Dark mode
        <button onClick={e=>setTheme(theme.mode === 'dark' ? {mode: ''} : {mode:'dark'})}>Dark Mode </button>
        </p>
      </div>
      
    </>
    </ThemeProvider>
    
    
  );
};
