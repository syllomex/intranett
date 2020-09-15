import React, { FormEvent } from "react";
import { Link, Redirect } from "react-router-dom";
import { useProfile } from "../../contexts/profile";
import { api } from "../../services/api";
import { handleFormSubmit } from "../../utils/handleFormSubmit";

import { Container, FormContainer, Title } from "./styles";

const SignIn: React.FC = () => {
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
          <label className="form-style" htmlFor="name">
            Nome completo
          </label>
          <input className="form-style" type="text" name="name" id="name" />

          <label className="form-style" htmlFor="email">
            E-mail
          </label>
          <input className="form-style" type="email" name="email" id="email" />

          <label className="form-style" htmlFor="password">
            Senha
          </label>
          <input
            className="form-style"
            type="password"
            name="password"
            id="password"
          />

          <span className="form-style">
            Já possui uma conta? <Link to="/">Clique aqui</Link> para entrar!
          </span>

          <button
            className="button submit"
            style={{ width: "100%" }}
            type="submit"
          >
            Criar Conta
          </button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default SignIn;
