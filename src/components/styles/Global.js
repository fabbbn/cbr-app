import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
    * {
        box-sizing: border-box;
    }
    h1,
    h2,
    h3,
    h4,
    h5 {
        display: block;
        padding: 10px 0;
        margin: 20px 0;
        text-transform: capitalize;
    }
    h1,
    h2,
    h3 {
        text-align: center;
    }
    body {
        background-color: white;
        color: black;
        font-family: 'Roboto', sans-serif;
        font-size: 1.15em;
        margin: 0;
        height: 100%;
    }

    img {
        max-width: 100%;
    }
    
    p {
        font-size: 1rem;
    }

    .custom-btn {
        text-decoration: none;
        width: 150px;
        height: 40px;
        text-align: center;
        line-height: 20px;
        margin: 10px 10px 10px 0px;
        cursor: pointer;
        transition: 0.15s;
        color: white;
        background: #50453D;
        &:hover {
            opacity:0.9;
            transform: scale(0.98);
        }
        display: inline;
    }

    .custom-btn-inv {
        width: 150px;
        height: 40px;
        text-align: center;
        line-height: 20px;
        margin: 10px 10px 10px 0px;
        cursor: pointer;
        transition: 0.15s;
        color: #50453D;
        background: white;
        &:hover {
            opacity:0.9;
            transform: scale(0.98);
        }
        display: inline;
    }

`

export default GlobalStyles;