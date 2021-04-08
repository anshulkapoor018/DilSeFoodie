
import React, {useEffect, useState} from "react";
import ReactDom from 'react-dom';
import storage from  'local-storage-fallback';
import Jumbotron from 'react-bootstrap/Jumbotron'
import {
  ThemeProvider,
  createGlobalStyle
} from 'styled-components';

// This is used to change the style on state request
const GlobalStyle = createGlobalStyle`

body {
  background-color: ${props =>
    props.theme.mode === 'dark' ? '#111' : '#EEE'};
  color: ${props =>
    props.theme.mode === 'dark' ? '' : ''};
  background: ${props =>
    props.theme.mode === 'dark' ? '#111' : ""};
}

p{
  color: ${props =>
    props.theme.mode === 'dark' ? '#EEE' : ''};

}
`;

// This handles the storage of user's preference in a local storage
function getInitialTheme(){
  const savedTheme = storage.getItem('theme') // Trying to get the current state of 'theme'
  return savedTheme ? JSON.parse(savedTheme): {mode: ''}
}

// This function acts as a component that displays the button for change of state of accessibility features
export const Dark = () => {
  const [theme, setTheme] = useState(getInitialTheme) // Using reack hooks to manage state
  useEffect(
    () => {
      storage.setItem('theme', JSON.stringify(theme));
    },
    [theme]
  );

  return (
    <ThemeProvider theme={theme}>
    <> 
      <GlobalStyle />
      <div className="container">
      <Jumbotron>
        <h1>We think about disability so we have some settings to toggle!</h1>
        
  
    </Jumbotron>
        <p> </p>
        <p> Click me for Dark mode
        <button onClick={e=>setTheme(theme.mode === 'dark' ? {mode: ''} : {mode:'dark'})}>Dark Mode </button>
        </p>
      </div>
      
    </>
    </ThemeProvider>
    
    
  );
};
