import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Input, Label, SubmitButton } from "../../components/Styled";
import { useLoadingSpinner } from "../../contexts/loadingSpinner";
import { useProfile } from "../../contexts/profile";
import { api } from "../../services/api";
import { handleFormData } from "../../utils/handleFormData";
import { showMessage } from "../../utils/showMessage";

import { Container, FormContainer, SignInForm, Title } from "./styles";

const SignIn: React.FC = () => {
  const { profile, setProfile } = useProfile();

  const { loadingSpinner, setLoadingSpinner } = useLoadingSpinner();
  useEffect(() => {
    if (profile === undefined && !loadingSpinner) setLoadingSpinner(true);
    else if (profile !== undefined) setLoadingSpinner(false);
  }, [profile, loadingSpinner, setLoadingSpinner]);

  const [fetching, setFetching] = useState(false);

  const responseRef = useRef<any>();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setFetching(true);
    const data = handleFormData(e);

    try {
      const response = await api.post("/auth", data);
      const access_token = response.data.access_token;

      setFetching(false);

      if (access_token) {
        localStorage.setItem("access_token", access_token);
        setProfile({ access_token });
      }
    } catch (error) {
      let message = error?.response?.data?.message;

      if (message === "invalid password")
        message = "Senha inválida. Tente novamente.";
      else if (message === "user not found") message = "E-mail não cadastrado.";

      showMessage(responseRef, message, "error");
      setFetching(false);
    }
  }

  if (profile?.access_token) return <Redirect to="/tarefas" />;

  return (
    <Container>
      <FormContainer>
        <Title>Login</Title>
        <SignInForm onSubmit={handleSubmit}>
          <Label htmlFor="email">E-mail</Label>
          <Input type="email" name="email" required />

          <Label htmlFor="password">Senha</Label>
          <Input type="password" name="password" required />

          <span className="alert" ref={responseRef}></span>

          <span className="form-style">
            Não possui uma conta? <Link to="/cadastro">Clique aqui</Link> para
            cadastrar-se!
          </span>

          <SubmitButton disabled={fetching} className="w-100">
            Entrar
          </SubmitButton>
        </SignInForm>
      </FormContainer>
    </Container>
  );
};

export default SignIn;
