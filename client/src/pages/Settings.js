import React, {useEffect, useState} from "react";
import ReactDom from 'react-dom';
import storage from 'local-storage-fallback';
import style from 'styled-theming';
import Jumbotron from 'react-bootstrap/Jumbotron';
import {
  ThemeProvider,
  createGlobalStyle
} from 'styled-components';

const getBackground = style('mode', {
  light: "",
  dark: '#111'
});

// Function to select the general color
const getForeground = style('mode', {
  light: '',
  dark: '#111'
});

// Changing all text colors
const getText = style('mode', {
  light: '',
  dark: '#EEE'
});

// Changing all text colors
const getP = style('mode', {
  light: '',
  dark: 'white'
});

// Changing font size by zooming
const getFontSize = style('textZoom', {
  normal: '1em',
  magnify: '2em'
});

// This is used to change the style on state request
const GlobalStyle = createGlobalStyle`

body {
  background-color: ${getBackground};
  color: ${getText};
  background: ${getForeground};
  font-size: ${getFontSize}
}

p{
  color: ${getP}
  font-size: ${getFontSize}

}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

`;

// This handles the storage of user's preference in a local storage
function getInitialTheme(){
  const savedTheme = storage.getItem('theme') // Trying to get the current state of 'theme'
  return savedTheme 
  ? JSON.parse(savedTheme)
  : {mode: '', textZoom: 'normal'};
}

// This function acts as a component that displays the button for change of state of accessibility features
export const Dark = () => {
  const [theme, setTheme] = useState(getInitialTheme) // Using reack hooks to manage state
  useEffect( 
    () => {
      storage.setItem('theme', JSON.stringify(theme)); // Setting the storage item to the current state of the 'theme'
    },
    [theme] // Theme variable
  );

  return (
    <ThemeProvider theme={theme}>
    <> 
      <GlobalStyle />
      <div className="container">
        
          <h1>We think about disability so we have some settings to toggle!</h1>
        <p>Dark Mode 
        <label class="switch">
          <input  type="checkbox" onClick={e=>
            setTheme(
              theme.mode === 'dark' 
                ? {...theme, mode: ''} 
                : {...theme, mode:'dark'}
            )}/> 
          <span class="slider round"></span> 
       </label>
       </p>
        

        <p>Toggle Zoom 
        <label class="switch">
          <input  type="checkbox"onClick={e=>
            setTheme(
              theme.textZoom === 'normal' 
                ? {...theme, textZoom: 'magnify'} 
                : {...theme, textZoom:'normal'}
            )}/> 
          <span class="slider round"></span> 
       </label>
       </p>

        
      </div>
      
    </>
    </ThemeProvider>
    
    
  );
};
