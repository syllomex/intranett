import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #0073a8;
    --link: #7af;
  }

  * {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;

    font-family: "Roboto", sans-serif;
    text-rendering: optimizeLegibility;

    color: #555;
  }
  
  html, body, #root {
    overflow-y: auto;
    min-height: 100vh;
  }

  a {
    text-decoration: none;
    color: var(--link);

    &:hover {
      opacity: 0.7;
    }

    &:active {
      opacity: 0.5;
    }
  }

  button, input, textarea {
    border: none;
    text-rendering: optimizeLegibility;
    letter-spacing: 0.08rem;
  }

  label.form-style {
    display: block;
    margin-bottom: 0.8rem;

    font-weight: 600;
  }

  input.form-style {
    padding: 0.8rem;

    border: 1px solid #ddd;
    font-size: 1rem;
    color: #555;

    margin-bottom: 2rem;
    width: 100%;

    transition-duration: .2s;
    &:focus {
      border: 1px solid var(--primary);
    }
  }

  span.form-style {
    font-size: .9rem;
    display: block;
    margin-bottom: 1.7rem;
  }

  button.button {
    cursor: pointer;
    display: block;
    /* width: 100%; */

    padding: 1rem;
    font-size: 1.1rem;
    box-shadow: 1px 2px 5px 0px #888;

    transition-duration: .2s;

    &:hover {
      opacity: 0.8;
    }

    &:active {
      opacity: 0.6;
    }
  }

  button.submit {
    background-color: var(--primary);
    color: #eee;
  }

  button.cancel {
    background-color: #fff;
  }

  .d-flex {
    display: flex;
  }

  .justify-end {
    justify-content: flex-end;
  }
`;

export { GlobalStyles };
