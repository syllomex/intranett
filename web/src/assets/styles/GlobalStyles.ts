import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #0073a8;
  }

  * {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;

    font-family: "Roboto", sans-serif;

    color: #555;
  }
  
  html, body, #root {
    height: 100vh;
  }

  a {
    text-decoration: none;
    color: #7af;

    &:hover {
      opacity: 0.7;
    }

    &:active {
      opacity: 0.5;
    }
  }

  button, input, textarea {
    border: none;
  }
`;

export { GlobalStyles };
