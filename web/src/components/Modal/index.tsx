import React from "react";

import {
  Container,
  ModalContainer,
  Overlay,
  Title,
  Header,
  CloseButton,
} from "./styles";

interface IProps {
  state: any;
  setState: React.Dispatch<any>;
  title: string;
}

const Modal: React.FC<IProps> = ({
  state,
  setState,
  title,
  children,
  ...rest
}) => {
  function handleCloseModal() {
    setState(false);
  }

  if (!state) return null;

  window.onkeyup = (e: any) => {
    if (e.key === "Escape") handleCloseModal();
  };

  return (
    <React.Fragment>
      <Overlay onClick={handleCloseModal} />
      <Container>
        <ModalContainer {...rest}>
          <Header>
            <Title>{title}</Title>
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
          </Header>
          {children}
        </ModalContainer>
      </Container>
    </React.Fragment>
  );
};

export default Modal;
