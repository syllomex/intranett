import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useProfile } from "../../contexts/profile";
import { api } from "../../services/api";
import { handleFormData } from "../../utils/handleFormData";

import { Container, FormContainer, Title } from "./styles";

import { Input, Label, SubmitButton } from "../../components/Styled";
import { showMessage } from "../../utils/showMessage";
import { useLoadingSpinner } from "../../contexts/loadingSpinner";

const SignUp: React.FC = () => {
  const { profile, setProfile } = useProfile();
  const [fetching, setFetching] = useState(false);

  const { loadingSpinner, setLoadingSpinner } = useLoadingSpinner();
  useEffect(() => {
    if (profile === undefined && !loadingSpinner) setLoadingSpinner(true);
    else if (profile !== undefined) setLoadingSpinner(false);
  }, [profile, loadingSpinner, setLoadingSpinner]);

  const responseRef = useRef<any>();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setFetching(true);
    const data = handleFormData(e);

    try {
      await api.post("/users", data);

      const response = await api.post("/auth", data);
      const access_token = response.data.access_token;

      if (access_token) {
        localStorage.setItem("access_token", access_token);
        setProfile({ access_token });
      }
      setFetching(false);
    } catch (error) {
      let message = error?.response?.data?.message;

      if (message === "user already exists") message = "E-mail já utilizado.";

      showMessage(responseRef, message, "error");
      setFetching(false);
    }
  }

  if (profile?.access_token) return <Redirect to="/tarefas" />;

  return (
    <Container>
      <FormContainer>
        <Title>Criar conta</Title>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="name">Nome completo</Label>
          <Input name="name" required />

          <Label htmlFor="email">E-mail</Label>
          <Input type="email" name="email" required />

          <Label htmlFor="password">Senha</Label>
          <Input type="password" name="password" required />

          <span className="alert" ref={responseRef}></span>

          <span className="form-style">
            Já possui uma conta? <Link to="/">Clique aqui</Link> para entrar!
          </span>

          <SubmitButton disabled={fetching} className="w-100">
            Criar Conta
          </SubmitButton>
        </form>
      </FormContainer>
    </Container>
  );
};

export default SignUp;
