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
  return (
    <ThemeProvider theme={{mode: ''}}>
    <> 
      <GlobalStyle />
      <div className="container">
        <p>Dark mode button</p>
      </div>
    </>
    </ThemeProvider>
    
    
  );
};