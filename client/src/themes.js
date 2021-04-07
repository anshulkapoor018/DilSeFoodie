import {createGlobalStyle} from 'styled-components';
import BGE3 from './assets/BG3.jpg'; // Tell webpack this JS file uses this image
import Dark_BG from './assets/Dark-BG.jpeg'; // Tell webpack this JS file uses this image


export const lightTheme = {
    body: '#fff',
    fontColor: '#000',
    background: BGE3,
 
};

export const darkTheme = {
    body: "#000",
    fontColor: '#fff',
    background: Dark_BG,

};


export const GlobalStyles = createGlobalStyle`
 
    background{
        backgroundImage = ${props => props.theme.background};
    }

`