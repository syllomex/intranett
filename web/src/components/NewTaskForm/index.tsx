import moment, { now } from "moment";
import React, { FormEvent, useState } from "react";
import { useProfile } from "../../contexts/profile";
import { api } from "../../services/api";
import { handleFormData } from "../../utils/handleFormData";
import { BorderlessInput, CancelButton, Label, SubmitButton } from "../Styled";

interface IProps {
  newTaskDefaultName: string;
  setTasks: React.Dispatch<any>;
  closeModal: Function;
}

const NewTaskForm: React.FC<IProps> = ({
  newTaskDefaultName,
  setTasks,
  closeModal,
}) => {
  const { profile } = useProfile();
  const [fetching, setFetching] = useState(false);
  
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setFetching(true);
    let data = handleFormData(e);
    data.start_date = new Date(data.start_date + "T" + data.start_time);
    delete data.start_time;
    
    try {
      await api.post("/tasks", data, {
        headers: {
          Authorization: `Bearer ${profile?.access_token}`,
        },
      });
      setTasks(null);
      closeModal();
      setFetching(false);
    } catch (error) {
      console.error(error?.response?.data?.message);
      setFetching(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="name">Nome da tarefa</Label>
      <BorderlessInput
        className="form-style border-bottom-only"
        name="name"
        defaultValue={newTaskDefaultName}
        required
      />

      <Label htmlFor="start_date">Data de início</Label>
      <BorderlessInput
        type="date"
        name="start_date"
        defaultValue={moment(now()).format("YYYY-MM-DD")}
        required
      />

      <Label htmlFor="start_date">Hora de início</Label>
      <BorderlessInput
        type="time"
        name="start_time"
        defaultValue={moment(now()).format("HH:mm")}
        required
      />

      <div className="d-flex justify-end">
        <CancelButton className="mr-1" onClick={() => closeModal()}>
          VOLTAR
        </CancelButton>
        <SubmitButton disabled={fetching}>CRIAR</SubmitButton>
      </div>
    </form>
  );
};

export default NewTaskForm;
