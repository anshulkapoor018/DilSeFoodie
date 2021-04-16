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


// $('.controllers-dark').addClass('controllers').removeClass('controllers-dark');
// $('.selected-controllers-dark').addClass('selected-controllers').removeClass('selected-controllers-dark');
// $('.search-card-center-dark').addClass('search-card-center').removeClass('search-card-center-dark');
// $('h1').css({"background-color":"#fafafa"});
// $('h2').css({"background-color":"#fafafa"});
// $('p').css({"color":"#001514"});
// $('button').css({"color":"#212529"});
// $('.searchFields').css({"background":"white"});
// $('.card').css({"background-color":"#fff"});
// $('.card-center').css({"background-color":"#fafafa"});
// $('.card-wide').css({"background-color":"#fafafa"});
// $('.jumbotron').css({"background-color":"#fafafa"});