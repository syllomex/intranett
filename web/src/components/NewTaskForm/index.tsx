import moment, { now } from "moment";
import React, { FormEvent } from "react";
import { useProfile } from "../../contexts/profile";
import { api } from "../../services/api";
import { handleFormSubmit } from "../../utils/handleFormSubmit";

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    let data = handleFormSubmit(e);
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
    } catch (error) {
      console.error(error.response.data);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="form-style" htmlFor="name">
        Nome da tarefa
      </label>
      <input
        className="form-style"
        type="text"
        name="name"
        id="name"
        defaultValue={newTaskDefaultName}
        required
      />

      <label className="form-style" htmlFor="start_date">
        Data de início
      </label>
      <input
        className="form-style"
        type="date"
        name="start_date"
        id="start_date"
        defaultValue={moment(now()).format("YYYY-MM-DD")}
        required
      />

      <label className="form-style" htmlFor="start_date">
        Hora de início
      </label>
      <input
        className="form-style"
        type="time"
        name="start_time"
        id="start_time"
        defaultValue={moment(now()).format("HH:mm")}
        required
      />

      <div className="d-flex justify-end">
        <button
          className="button cancel"
          style={{ marginRight: "1rem" }}
          type="button"
          onClick={() => closeModal()}
        >
          CANCELAR
        </button>
        <button className="button submit" type="submit">
          CRIAR
        </button>
      </div>
    </form>
  );
};

export default NewTaskForm;
