import React, { FormEvent, useState } from "react";
import moment, { now } from "moment";

import { formatTime } from "../../utils/formatTime";
import { ITask } from "../../interfaces/Task";
import { handleFormData } from "../../utils/handleFormData";
import { useProfile } from "../../contexts/profile";
import { api } from "../../services/api";
import {
  BorderlessInput,
  CancelButton,
  Label,
  SubmitButton,
  Textarea,
} from "../Styled";

interface IProps {
  task: ITask;
  setTasks: React.Dispatch<any>;
  handleCloseModal: React.Dispatch<any>;
  handleCloseCancelModal: React.Dispatch<any>;
}

const CancelTaskForm: React.FC<IProps> = ({
  task,
  setTasks,
  handleCloseModal,
  handleCloseCancelModal,
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
      await api.put(`/tasks/${task.id}/cancel`, data, {
        headers: {
          Authorization: `Bearer ${profile?.access_token}`,
        },
      });

      setTasks(null);
      handleCloseCancelModal(false);
      handleCloseModal(false);
      setFetching(false);
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

        <div>
          <Label htmlFor="cancel_reason">
            <strong>Motivo</strong>
          </Label>
        </div>
        <div>
          <Textarea
            name="cancel_reason"
            placeholder="Por que você quer cancelar essa tarefa?"
            required
          />
        </div>

        <div className="d-flex justify-end">
          <CancelButton className="mr-1" onClick={handleCloseCancelModal}>
            VOLTAR
          </CancelButton>
          <SubmitButton disabled={fetching}>CANCELAR TAREFA</SubmitButton>
        </div>
      </form>
    </React.Fragment>
  );
};

export default CancelTaskForm;
