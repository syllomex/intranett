import React, { FormEvent } from "react";
import { Link, Redirect } from "react-router-dom";
import { useProfile } from "../../contexts/profile";
import { api } from "../../services/api";
import { handleFormSubmit } from "../../utils/handleFormSubmit";

import { Container, FormContainer, Title } from "./styles";

import { Input, Label, SubmitButton } from "../../components/Styled";

const SignUp: React.FC = () => {
  const { profile, setProfile } = useProfile();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    const data = handleFormSubmit(e);

    try {
      await api.post("/users", data);

      const response = await api.post("/auth", data);
      const access_token = response.data.access_token;

      if (access_token) {
        localStorage.setItem("access_token", access_token);
        setProfile({ access_token });
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  }

  if (profile?.access_token) return <Redirect to="/tarefas" />;

  return (
    <Container>
      <FormContainer>
        <Title>Criar conta</Title>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="name">Nome completo</Label>
          <Input name="name" />

          <Label htmlFor="email">E-mail</Label>
          <Input type="email" name="email" />

          <Label htmlFor="password">Senha</Label>
          <Input type="password" name="password" />

          <span className="form-style">
            Já possui uma conta? <Link to="/">Clique aqui</Link> para entrar!
          </span>

          <SubmitButton className="w-100">Criar Conta</SubmitButton>
        </form>
      </FormContainer>
    </Container>
  );
};

export default SignUp;
