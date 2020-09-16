import React, { FormEvent } from "react";
import { Link, Redirect } from "react-router-dom";
import { Input, Label, SubmitButton } from "../../components/Styled";
import { useProfile } from "../../contexts/profile";
import { api } from "../../services/api";
import { handleFormSubmit } from "../../utils/handleFormSubmit";

import { Container, FormContainer, SignInForm, Title } from "./styles";

const SignIn: React.FC = () => {
  const { profile, setProfile } = useProfile();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    const data = handleFormSubmit(e);

    try {
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
        <Title>Login</Title>
        <SignInForm onSubmit={handleSubmit}>
          <Label htmlFor="email">E-mail</Label>
          <Input type="email" name="email" />

          <Label htmlFor="password">Senha</Label>
          <Input type="password" name="password" />

          <span className="form-style">
            Não possui uma conta? <Link to="/cadastro">Clique aqui</Link> para
            cadastrar-se!
          </span>

          <SubmitButton className="w-100">Entrar</SubmitButton>
        </SignInForm>
      </FormContainer>
    </Container>
  );
};

export default SignIn;
