import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { PINK_COLOR } from './colors';
const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'SBAggroB';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SBAggroB.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    /* @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;500;900&display=swap'); */


    ${reset} //styled-reset 설치, 추가
    * {
        box-sizing: border-box;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    body {
        font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    }
    button{
        all:unset
    }
    input:focus, textarea:focus {outline: none;}
    textarea{
        resize: none;
        font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    }
    h2.section-title{
        padding: 18px 20px 10px;
        margin: 0 0 10px;
        font-size: 1.8rem;
        font-weight: bold;
        color: ${PINK_COLOR[0]};
        border: 2px solid #333;
        border-radius: 20px;
        box-shadow: 0 3px 0 #333;
        @media screen and (max-width: 500px) {
            width: 90%;
            margin: 0 auto;
            text-align: center
        }
    }
    h1,h2,h3{
        font-family: 'SBAggroB',-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    }

    pre{
        line-height: 1.4;
    }

    #root {
        min-height: 100vh;
    }
    .center{
        max-width: 1280px;
        /* min-width: 800px; */
        padding: 0 30px;
        margin: auto;
        @media screen and (max-width: 500px) {
        padding: 0;
        }
    }
`;

export default GlobalStyle;
