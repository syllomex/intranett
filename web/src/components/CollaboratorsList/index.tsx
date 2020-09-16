import React, { FormEvent } from "react";
import { useProfile } from "../../contexts/profile";
import { api } from "../../services/api";
import { handleFormSubmit } from "../../utils/handleFormSubmit";
import { BorderlessInput, CancelButton, SubmitButton } from "../Styled";

interface IProps {
  collaborators: any[];
  refreshCollaborators: Function;
  team_id: string;
  close: React.Dispatch<any>;
}

const CollaboratorsList: React.FC<IProps> = ({
  collaborators,
  refreshCollaborators,
  team_id,
  close,
}) => {
  const { profile } = useProfile();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = handleFormSubmit(e);

    try {
      await api.post(`/teams/${team_id}/collaborators`, data, {
        headers: { Authorization: `Bearer ${profile?.access_token}` },
      });
      refreshCollaborators();
    } catch (error) {
      console.error(error.response.data.message);
    }
  }

  return (
    <div>
      {collaborators.map((collaborator: any) => (
        <span key={collaborator.id}>
          {collaborator.name} ({collaborator.email})
        </span>
      ))}

      <form style={{ marginTop: "2rem" }} onSubmit={handleSubmit}>
        <label className="form-style" htmlFor="email">
          Adicionar colaborador
        </label>
        <BorderlessInput type="email" name="email" placeholder="E-mail" />

        <div className="d-flex justify-end">
          <CancelButton className="mr-1" onClick={close}>
            VOLTAR
          </CancelButton>
          <SubmitButton>ADICIONAR COLABORADOR</SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default CollaboratorsList;
