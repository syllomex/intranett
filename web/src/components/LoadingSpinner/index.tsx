import React from "react";

import { Container, Spinner } from "./styles";

const LoadingSpinner: React.FC = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};

export default LoadingSpinner;
