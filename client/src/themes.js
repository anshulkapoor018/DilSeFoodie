import {createGlobalStyle} from 'styled-components';
export const lightTheme = {
    body: '#f3ead8',
    fontColor: '#161616',
    background: '#f3ead8',
};

export const darkTheme = {
    body: '#151515',
    fontColor: '#f8f1e4',
    background: '#191816',
};


export const GlobalStyles = createGlobalStyle`
 
    background{
        backgroundImage = ${props => props.theme.background};
    }


`
