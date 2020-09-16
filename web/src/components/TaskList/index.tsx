import React, { useState } from "react";

import {
  TaskTable,
  TaskTableHead,
  TaskTableBody,
  TaskTableDivision,
  CheckCircleIcon,
  CancelIcon,
} from "./styles";

import { ITask } from "../../interfaces/Task";
import Modal from "../Modal";
import { formatTime } from "../../utils/formatTime";
import { convertStatusToString } from "../../utils/convertStatusToString";
import FinishTaskForm from "../FinishTaskForm";
import CancelTaskForm from "../CancelTaskForm";
import { useProfile } from "../../contexts/profile";
import { CancelButton, SubmitButton } from "../Styled";

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
  const { profile } = useProfile();

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

  const handlers = {
    openCancelModal: () => setCancelModal(true),
    closeCancelModal: () => setCancelModal(false),
    openFinishModal: () => setFinishModal(true),
    closeFinishModal: () => setFinishModal(false),
  };

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
          {tasks?.length === 0 && (
            <tr>
              <td colSpan={5}>Nenhuma tarefa na lista.</td>
            </tr>
          )}

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

              <td
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "0.4rem",
                }}
              >
                {task.status === 0 && (
                  <React.Fragment>
                    <a
                      href="#!"
                      onClick={() => {
                        setTask(task);
                        handlers.openCancelModal();
                      }}
                    >
                      <CancelIcon />
                    </a>
                    <a
                      href="#!"
                      onClick={() => {
                        setTask(task);
                        handlers.openFinishModal();
                      }}
                    >
                      <CheckCircleIcon />
                    </a>
                  </React.Fragment>
                )}
              </td>
            </tr>
          ))}

          {profile?.access === 1 && (
            <React.Fragment>
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
            </React.Fragment>
          )}
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

          <div className="mt-2">
            <strong>Término: </strong>
            <span>
              {task.end_date
                ? formatTime(task.end_date)
                : "Tarefa em andamento."}
            </span>
          </div>

          {task.cancel_reason && (
            <div className="mt-2">
              <strong>Motivo de cancelamento: </strong>
              <span>{task.cancel_reason}</span>
            </div>
          )}

          {isCollab && (
            <div className="mt-2">
              <strong>Colaborador: </strong>
              <span>
                {task.user_name} ({task.email})
              </span>
            </div>
          )}

          {task.status === 0 && !isCollab ? (
            <div className="d-flex justify-end">
              <CancelButton className="mr-1" onClick={handlers.openCancelModal}>
                CANCELAR
              </CancelButton>
              <SubmitButton type="button" onClick={handlers.openFinishModal}>
                FINALIZAR
              </SubmitButton>
            </div>
          ) : (
            <div className="d-flex justify-end">
              <CancelButton onClick={handleCloseModal}>VOLTAR</CancelButton>
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
              handleCloseCancelModal={handlers.closeCancelModal}
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
              handleCloseFinishModal={handlers.closeFinishModal}
            />
          </Modal>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default TaskList;
