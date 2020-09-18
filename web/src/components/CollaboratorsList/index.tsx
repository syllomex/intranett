import React, { FormEvent, useRef, useState } from "react";
import { useProfile } from "../../contexts/profile";
import { api } from "../../services/api";
import { handleFormData } from "../../utils/handleFormData";
import { showMessage } from "../../utils/showMessage";
import { BorderlessInput, CancelButton, SubmitButton } from "../Styled";

interface IProps {
  collaborators: any[];
  refreshCollaborators: Function;
  refreshTasks: Function;
  team_id: string;
  close: React.Dispatch<any>;
}

const CollaboratorsList: React.FC<IProps> = ({
  collaborators,
  refreshCollaborators,
  refreshTasks,
  team_id,
  close,
}) => {
  const { profile } = useProfile();
  const [fetching, setFetching] = useState(false);

  const responseRef = useRef<any>();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setFetching(true);
    e.preventDefault();
    const data = handleFormData(e);

    try {
      await api.post(`/teams/${team_id}/collaborators`, data, {
        headers: { Authorization: `Bearer ${profile?.access_token}` },
      });

      refreshCollaborators();
      refreshTasks();

      let message = "Colaborador adicionado com sucesso!";
      showMessage(responseRef, message, "success");
      setFetching(false);
    } catch (error) {
      let message = error?.response?.data?.message;

      if (message === "user already in this team")
        message = "O colaborador já está na equipe.";
      else if (message === "user not found")
        message = "Usuário não encontrado. Tente novamente.";

      showMessage(responseRef, message, "error");
      setFetching(false);
    }
  }

  return (
    <div>
      {collaborators.map((collaborator: any) => (
        <div key={collaborator.id} style={{ marginBottom: "0.3rem" }}>
          {collaborator.name} ({collaborator.email})
        </div>
      ))}

      <form style={{ marginTop: "2rem" }} onSubmit={handleSubmit}>
        <label className="form-style" htmlFor="email">
          Adicionar colaborador
        </label>
        <BorderlessInput
          type="email"
          name="email"
          placeholder="E-mail"
          required
        />

        <span className="alert" ref={responseRef}></span>

        <div className="d-flex justify-end">
          <CancelButton className="mr-1" onClick={close}>
            VOLTAR
          </CancelButton>
          <SubmitButton disabled={fetching}>ADICIONAR COLABORADOR</SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default CollaboratorsList;
