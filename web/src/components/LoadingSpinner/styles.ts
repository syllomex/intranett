import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;

  background-color: #fefefe;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Spinner = styled.div`
  width: 6rem;
  height: 6rem;

  border: 0.6rem solid #ddd;
  border-top: 0.6rem solid #888;

  border-radius: 50%;

  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
