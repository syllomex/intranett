import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #0073a8;
    --danger: #f65;
    --success: #0e5;
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

    font-weight: 600;
  }

  input.form-style, textarea.form-style {
    margin-top: 0.8rem;
    padding: 0.8rem;

    border: 1px solid #ddd;
    font-size: 1rem;
    color: #555;

    margin-bottom: 2rem;
    width: 100%;

    transition: border-color .2s;

    &:focus {
      border-color: var(--primary);
    }
  }

  textarea.form-style {
    resize: vertical;
  }

  input.border-bottom-only, textarea.border-bottom-only {
    border-top: 0;
    border-left: 0;
    border-right: 0;
    padding-left: 0;
    margin-top: 0;
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

  span.alert {
    display: none;
    margin-bottom: 2rem;
  }

  span.alert.success {
    color: var(--success);
  }

  span.alert.error {
    color: var(--danger);
  }

  .d-flex {
    display: flex;
  }

  .justify-end {
    justify-content: flex-end;
  }

  .w-100 {
    width: 100%;
  }

  .mt-2 {
    margin-top: 2rem;
  }

  .mr-1 {
    margin-right: 1rem;
  }
`;

export { GlobalStyles };
