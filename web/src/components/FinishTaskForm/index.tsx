import React, { FormEvent, useState } from "react";
import moment, { now } from "moment";

import { ITask } from "../../interfaces/Task";
import { formatTime } from "../../utils/formatTime";
import { api } from "../../services/api";
import { handleFormData } from "../../utils/handleFormData";
import { useProfile } from "../../contexts/profile";
import { BorderlessInput, CancelButton, Label, SubmitButton } from "../Styled";

interface IProps {
  task: ITask;
  setTasks: React.Dispatch<any>;
  handleCloseModal: React.Dispatch<any>;
  handleCloseFinishModal: React.Dispatch<any>;
}

const FinishTaskForm: React.FC<IProps> = ({
  task,
  setTasks,
  handleCloseFinishModal,
  handleCloseModal,
}) => {
  const { profile } = useProfile();
  const [fetching, setFetching] = useState(false);
  
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setFetching(true);
    e.preventDefault();
    
    let data = handleFormData(e);
    data.end_date = new Date(`${data.end_date}T${data.end_time}`);
    delete data.end_time;

    try {
      await api.put(`/tasks/${task.id}/finish`, data, {
        headers: {
          Authorization: `Bearer ${profile?.access_token}`,
        },
      });
      
      setFetching(false);
      setTasks(null);
      handleCloseFinishModal(false);
      handleCloseModal(false);
    } catch (error) {
      console.error(error?.response?.data?.message);
      setFetching(false);
    }
  }
  
  return (
    <React.Fragment>
      <div>
        <strong>Início: </strong>
        <span>{formatTime(task.start_date)}</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-2">
          <Label htmlFor="end_date">
            <strong>Término</strong>
          </Label>
        </div>

        <div className="d-flex">
          <BorderlessInput
            className="mr-1"
            type="date"
            name="end_date"
            defaultValue={moment(now()).format("YYYY-MM-DD")}
            required
          />
          <BorderlessInput
            type="time"
            name="end_time"
            defaultValue={moment(now()).format("HH:mm")}
            required
          />
        </div>

        <div className="d-flex justify-end">
          <CancelButton className="mr-1" onClick={handleCloseFinishModal}>
            VOLTAR
          </CancelButton>
          <SubmitButton disabled={fetching}>FINALIZAR TAREFA</SubmitButton>
        </div>
      </form>
    </React.Fragment>
  );
};

export default FinishTaskForm;
