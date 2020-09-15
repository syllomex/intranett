import styled from "styled-components";

export const Overlay = styled.div`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100%;

  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.5);

  z-index: 2;
`;

export const Container = styled.div`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100%;

  top: 0;
  left: 0;
`;

export const ModalContainer = styled.div`
  background-color: #fefefe;
  z-index: 4;

  padding: 1.3rem 2rem;
  border-radius: 5px;

  min-width: 40rem;

  box-shadow: 1px 1px 20px 1px #666;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Title = styled.h1`
  margin-bottom: 1.3rem;
  color: #222;
`;

export const CloseButton = styled.h1`
  cursor: pointer;
`
