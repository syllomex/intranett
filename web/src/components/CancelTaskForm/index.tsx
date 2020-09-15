import React, { FormEvent } from "react";
import moment, { now } from "moment";

import { formatTime } from "../../utils/formatTime";
import { ITask } from "../../interfaces/Task";
import { handleFormSubmit } from "../../utils/handleFormSubmit";
import { useProfile } from "../../contexts/profile";
import { api } from "../../services/api";

// import { Container } from './styles';

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let data = handleFormSubmit(e);
    data.end_date = new Date(`${data.end_date}T${data.end_time}`);
    delete data.end_time;

    console.log(data);

    try {
      await api.put(`/tasks/${task.id}/cancel`, data, {
        headers: {
          Authorization: `Bearer ${profile?.access_token}`,
        },
      });

      setTasks(null);
      handleCloseCancelModal(false);
      handleCloseModal(false);
    } catch (error) {
      console.error(error.response.data);
    }
  }

  return (
    <React.Fragment>
      <div>
        <strong>Início: </strong>
        <span>{formatTime(task.start_date)}</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: "2rem" }}>
          <label htmlFor="end_date">
            <strong>Término</strong>
          </label>
        </div>
        <input
          type="date"
          name="end_date"
          id="end_date"
          defaultValue={moment(now()).format("YYYY-MM-DD")}
          required
        />
        <input
          type="time"
          name="end_time"
          id="end_time"
          defaultValue={moment(now()).format("HH:mm")}
          required
        />

        <div>
          <label htmlFor="cancel_reason">
            <strong>Motivo</strong>
          </label>
        </div>
        <div>
          <textarea name="cancel_reason" id="cancel_reason" required />
        </div>

        <div className="d-flex justify-end">
          <button
            className="button cancel"
            type="button"
            style={{ marginRight: "1rem" }}
            onClick={handleCloseCancelModal}
          >
            VOLTAR
          </button>
          <button className="button submit" type="submit">
            CANCELAR TAREFA
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default CancelTaskForm;
