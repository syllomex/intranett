import React, { useState } from "react";
import moment, { now } from "moment";
import "moment/locale/pt-br";

import {
  TaskTable,
  TaskTableHead,
  TaskTableBody,
  TaskTableDivision,
} from "./styles";

import { ITask } from "../../interfaces/Task";
import Modal from "../Modal";
import { formatTime } from "../../utils/formatTime";
import { convertStatusToString } from "../../utils/convertStatusToString";
import FinishTaskForm from "../FinishTaskForm";
import CancelTaskForm from "../CancelTaskForm";

interface IProps {
  tasks: ITask[] | null;
  setTasks: React.Dispatch<any>;
  collaboratorsTasks: ITask[] | null;
}

const TaskList: React.FC<IProps> = ({
  tasks,
  setTasks,
  collaboratorsTasks,
}) => {
  const [task, setTask] = useState<ITask | undefined>();
  const [isCollab, setIsCollab] = useState(false);

  const [modal, setModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [finishModal, setFinishModal] = useState(false);

  function handleOpenModal(task: ITask) {
    setTask(task);
    setModal(true);
  }

  function handleCloseModal() {
    setModal(false);
    setTask(undefined);
  }

  function handleOpenCancelModal() {
    setCancelModal(true);
  }

  function handleCloseCancelModal() {
    setCancelModal(false);
  }

  function handleOpenFinishModal() {
    setFinishModal(true);
  }

  function handleCloseFinishModal() {
    setFinishModal(false);
  }

  return (
    <React.Fragment>
      <TaskTable>
        <TaskTableHead>
          <tr>
            <th>Tarefa</th>
            <th>Início</th>
            <th>Término</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </TaskTableHead>
        <TaskTableBody>
          {tasks?.map((task: ITask) => (
            <tr
              key={task.id}
              onClick={() => {
                handleOpenModal(task);
                setIsCollab(false);
              }}
            >
              <td>{task.name}</td>

              <td>{formatTime(task.start_date)}</td>
              <td>{task.end_date && formatTime(task.end_date)}</td>

              <td>{convertStatusToString(task.status)}</td>

              <td>
                {task.status === 0 && (
                  <React.Fragment>
                    <a
                      href="#!"
                      onClick={() => {
                        setTask(task);
                        handleOpenFinishModal();
                      }}
                    >
                      Concluir
                    </a>
                    <a
                      href="#!"
                      onClick={() => {
                        setTask(task);
                        handleOpenCancelModal();
                      }}
                    >
                      Cancelar
                    </a>
                  </React.Fragment>
                )}
              </td>
            </tr>
          ))}

          <TaskTableDivision>
            <td colSpan={5}>Tarefas de colaboradores</td>
          </TaskTableDivision>

          {collaboratorsTasks?.map((task: ITask) => (
            <tr
              key={task.id}
              onClick={() => {
                handleOpenModal(task);
                setIsCollab(true);
              }}
            >
              <td>{task.name}</td>

              <td>{formatTime(task.start_date)}</td>
              <td>{task.end_date && formatTime(task.end_date)}</td>

              <td>{convertStatusToString(task.status)}</td>

              <td></td>
            </tr>
          ))}
        </TaskTableBody>
      </TaskTable>

      {task && (
        <Modal
          title={`${task.name} - ${convertStatusToString(task.status)}`}
          setState={setModal}
          state={modal}
        >
          <div>
            <strong>Início: </strong>
            <span>{formatTime(task.start_date)}</span>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <strong>Término: </strong>
            <span>
              {task.end_date
                ? formatTime(task.end_date)
                : "Tarefa em andamento."}
            </span>
          </div>

          {task.cancel_reason && (
            <div style={{ marginTop: "2rem" }}>
              <strong>Motivo de cancelamento: </strong>
              <span>{task.cancel_reason}</span>
            </div>
          )}

          {isCollab && (
            <div style={{ marginTop: "2rem" }}>
              <strong>Colaborador: </strong>
              <span>
                {task.user_name} ({task.email})
              </span>
            </div>
          )}

          {task.status === 0 && !isCollab ? (
            <div className="d-flex justify-end">
              <button
                className="button cancel"
                type="button"
                style={{ marginRight: "1rem" }}
                onClick={handleOpenCancelModal}
              >
                CANCELAR
              </button>
              <button
                className="button submit"
                type="button"
                onClick={handleOpenFinishModal}
              >
                FINALIZAR
              </button>
            </div>
          ) : (
            <div className="d-flex justify-end">
              <button
                className="button cancel"
                type="button"
                onClick={handleCloseModal}
              >
                VOLTAR
              </button>
            </div>
          )}

          <Modal
            state={cancelModal}
            setState={setCancelModal}
            title={`Cancelar ${task.name}`}
          >
            <CancelTaskForm
              task={task}
              setTasks={setTasks}
              handleCloseModal={handleCloseModal}
              handleCloseCancelModal={handleCloseCancelModal}
            />
          </Modal>

          <Modal
            state={finishModal}
            setState={setFinishModal}
            title={`Finalizar ${task.name}`}
          >
            <FinishTaskForm
              task={task}
              setTasks={setTasks}
              handleCloseModal={handleCloseModal}
              handleCloseFinishModal={handleCloseFinishModal}
            />
          </Modal>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default TaskList;
