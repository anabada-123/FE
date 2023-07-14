import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'SBAggroB';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SBAggroB.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
    ${reset} //styled-reset 설치, 추가
    * {
        box-sizing: border-box;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    }
    button{
        all:unset
    }
    input:focus, textarea:focus {outline: none;}
    textarea{
        resize: none;
    }
    h2.section-title{
        padding: 14px 20px 10px;
    margin: 50px 0 10px;
    font-size: 1.8rem;
    font-weight: bold;
    color: hotpink;
    border: 2px solid #333;
    border-radius: 20px;
    box-shadow: 0 3px 0 #333;
    }
    h1,h2,h3{
        font-family: 'SBAggroB',-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    }

    #root {
        min-height: 100vh;
    }
    .center{
        max-width: 1280px;
        min-width: 800px;
        margin: auto;
    }
`;

export default GlobalStyle;
