import React, { FormEvent, useEffect, useRef, useState } from "react";

import { useProfile } from "../../contexts/profile";
import { ITask } from "../../interfaces/Task";
import { api } from "../../services/api";

import { Container, Header, NewTaskContainer, TasksContainer } from "./styles";
import Modal from "../../components/Modal";
import NewTaskForm from "../../components/NewTaskForm";
import TaskList from "../../components/TaskList";

const Tasks: React.FC = () => {
  const { profile, setProfile } = useProfile();

  const [tasks, setTasks] = useState<ITask[] | null>(null);
  const [collaboratorsTasks, setCollaboratorsTasks] = useState<ITask[] | null>(
    null
  );

  const [newTaskModal, setNewTaskModal] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");

  const newTaskInputRef = useRef<any>();

  function handleOpenNewTaskModal() {
    setNewTaskName(newTaskInputRef.current?.value);
    setNewTaskModal(true);
  }

  function handleCloseNewTaskModal() {
    setNewTaskModal(false);
  }

  function handleLogout() {
    localStorage.removeItem("access_token");
    setProfile(null);
  }

  async function fetchTasks() {
    try {
      const response = await api.get("/tasks", {
        headers: { Authorization: `Bearer ${profile?.access_token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  }

  async function fetchCollaboratorsTasks() {
    try {
      const response = await api.get("/teams/tasks", {
        headers: { Authorization: `Bearer ${profile?.access_token}` },
      });
      setCollaboratorsTasks(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  }

  async function finishTask(id: string) {
    try {
      await api.put(
        `/tasks/${id}/finish`,
        { end_date: new Date() },
        {
          headers: { Authorization: `Bearer ${profile?.access_token}` },
        }
      );
      setTasks(null);
    } catch (error) {
      console.error(error.response.data);
    }
  }

  async function cancelTask(id: string) {
    // try {
    //   await api.put(`/tasks/${id}/cancel`, {
    //     headers: { Authorization: `Bearer ${profile?.access_token}` },
    //   });
    //   setTasks(null);
    // } catch (error) {
    //   console.error(error.response.data);
    // }
  }

  function handleNewTaskForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleOpenNewTaskModal();
  }

  useEffect(() => {
    if (!tasks) fetchTasks();
    if (!tasks && profile?.access === 1) fetchCollaboratorsTasks();
  }, [tasks]);

  return (
    <React.Fragment>
      <Container>
        <div>
          <Header>
            <span>Tarefas</span>
            <div>
              <a href="#!">Criar Equipe</a>
              <a href="#!" onClick={handleLogout}>
                Sair
              </a>
            </div>
          </Header>
          <TasksContainer>
            <TaskList
              tasks={tasks}
              setTasks={setTasks}
              collaboratorsTasks={collaboratorsTasks}
            />
          </TasksContainer>

          <NewTaskContainer onSubmit={handleNewTaskForm}>
            <input
              type="text"
              placeholder="Nova tarefa"
              ref={newTaskInputRef}
            />
            <div onClick={handleOpenNewTaskModal}></div>
            <button type="submit" hidden></button>
          </NewTaskContainer>
        </div>
      </Container>

      <Modal
        state={newTaskModal}
        setState={setNewTaskModal}
        title="Nova Tarefa"
      >
        <NewTaskForm
          setTasks={setTasks}
          closeModal={handleCloseNewTaskModal}
          newTaskDefaultName={newTaskName}
        />
      </Modal>
    </React.Fragment>
  );
};

export default Tasks;
