import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useProfile } from "../../contexts/profile";
import { ITask } from "../../interfaces/Task";
import { api } from "../../services/api";

import {
  AddIcon,
  Container,
  Header,
  NewTaskContainer,
  TasksContainer,
} from "./styles";

import Modal from "../../components/Modal";
import NewTaskForm from "../../components/NewTaskForm";
import TaskList from "../../components/TaskList";
import NewTeamForm from "../../components/NewTeamForm";
import TeamsList from "../../components/TeamsList";

const Tasks: React.FC = () => {
  const { profile, setProfile } = useProfile();

  const [tasks, setTasks] = useState<ITask[] | null>(null);
  const [collaboratorsTasks, setCollaboratorsTasks] = useState<ITask[] | null>(
    null
  );

  const [newTaskName, setNewTaskName] = useState("");

  const [newTaskModal, setNewTaskModal] = useState(false);
  const [newTeamModal, setNewTeamModal] = useState(false);
  const [teamsListModal, setTeamsListModal] = useState(false);

  const newTaskInputRef = useRef<any>();

  const fetchTasks = useCallback(async () => {
    try {
      const response = await api.get("/tasks", {
        headers: { Authorization: `Bearer ${profile?.access_token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  }, [profile]);

  const fetchCollaboratorsTasks = useCallback(async () => {
    try {
      const response = await api.get("/teams/tasks", {
        headers: { Authorization: `Bearer ${profile?.access_token}` },
      });
      setCollaboratorsTasks(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  }, [profile]);

  const handlers = {
    closeNewTaskModal: () => setNewTaskModal(false),
    openNewTeamModal: () => setNewTeamModal(true),
    closeNewTeamModal: () => setNewTeamModal(false),
    openTeamsListModal: () => setTeamsListModal(true),
    closeTeamsListModal: () => setTeamsListModal(false),

    openNewTaskModal: () => {
      setNewTaskName(newTaskInputRef.current?.value);
      setNewTaskModal(true);
    },

    newTaskForm: (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handlers.openNewTaskModal();
    },

    logout: () => {
      localStorage.removeItem("access_token");
      setProfile(null);
    },
  };

  function onCreateNewTeam() {
    handlers.closeNewTeamModal();
    setTasks(null);
  }

  useEffect(() => {
    if (!tasks) fetchTasks();
  }, [tasks, fetchTasks]);

  useEffect(() => {
    if (!collaboratorsTasks && profile?.access === 1) fetchCollaboratorsTasks();
  }, [collaboratorsTasks, profile, fetchCollaboratorsTasks]);

  return (
    <React.Fragment>
      <Container>
        <div>
          <Header>
            <span>Tarefas</span>

            <div>
              {profile?.access === 1 && (
                <React.Fragment>
                  <a href="#!" onClick={handlers.openNewTeamModal}>
                    Criar equipe
                  </a>
                  <a href="#!" onClick={handlers.openTeamsListModal}>
                    Ver equipes
                  </a>
                </React.Fragment>
              )}

              <a href="#!" onClick={handlers.logout}>
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

          <NewTaskContainer onSubmit={handlers.newTaskForm}>
            <input
              type="text"
              placeholder="Nova tarefa"
              ref={newTaskInputRef}
            />
            <AddIcon onClick={handlers.openNewTaskModal} />
            
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
          closeModal={handlers.closeNewTaskModal}
          newTaskDefaultName={newTaskName}
        />
      </Modal>

      <Modal
        state={newTeamModal}
        setState={setNewTeamModal}
        title="Nova Equipe"
      >
        <NewTeamForm
          onSuccess={onCreateNewTeam}
          close={handlers.closeNewTeamModal}
        />
      </Modal>

      <Modal
        state={teamsListModal}
        setState={setTeamsListModal}
        title="Suas equipes"
      >
        <TeamsList close={handlers.closeTeamsListModal} />
      </Modal>
    </React.Fragment>
  );
};

export default Tasks;
