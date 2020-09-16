import React, { FormEvent } from "react";
import { useProfile } from "../../contexts/profile";
import { api } from "../../services/api";
import { handleFormData } from "../../utils/handleFormData";
import { CancelButton, Input, Label, SubmitButton } from "../Styled";

interface IProps {
  onSuccess: Function;
  close: React.Dispatch<any>;
}

const NewTeamForm: React.FC<IProps> = ({ onSuccess, close }) => {
  const { profile } = useProfile();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = handleFormData(e);

    try {
      await api.post("/teams", data, {
        headers: { Authorization: `Bearer ${profile?.access_token}` },
      });

      onSuccess();
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="name">Nome</Label>
        <Input
          name="name"
          placeholder="Escolha o nome da sua nova equipe"
          required
        />

        <div className="d-flex justify-end">
          <CancelButton onClick={close} className="mr-1">
            VOLTAR
          </CancelButton>
          <SubmitButton>CRIAR</SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default NewTeamForm;
