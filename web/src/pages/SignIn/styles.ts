import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
`;

export const FormContainer = styled.div`
  background-color: #fafafa;
  border: 1px solid #ddd;

  width: 28rem;
  padding: 2rem;
`;

export const Title = styled.h1`
  text-align: center;
  font-weight: 400;

  color: #333;

  margin-bottom: 2rem;
`;

export const SignInForm = styled.form`
  label {
    display: block;
    margin-bottom: 0.8rem;

    font-weight: 600;
  }

  input {
    padding: 0.8rem;

    border: 1px solid #ddd;
    font-size: 1.1rem;
    color: #555;

    margin-bottom: 2rem;
    width: 100%;

    transition-duration: .2s;
    &:focus {
      border: 1px solid var(--primary);
    }
  }

  span {
    font-size: .9rem;
    display: block;
    margin-bottom: 1.7rem;
  }

  button[type="submit"] {
    cursor: pointer;
    display: block;
    width: 100%;

    padding: 1rem;
    font-size: 1.1rem;

    background-color: var(--primary);
    color: #eee;

    transition-duration: .2s;

    &:hover {
      opacity: 0.8;
    }

    &:active {
      opacity: 0.6;
    }
  }
`;
