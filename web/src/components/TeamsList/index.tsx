import React, { useCallback, useEffect, useState } from "react";
import { useProfile } from "../../contexts/profile";
import { api } from "../../services/api";
import CollaboratorsList from "../CollaboratorsList";
import Modal from "../Modal";

interface IProps {
  close: React.Dispatch<any>;
}

const TeamsList: React.FC<IProps> = ({ close }) => {
  const { profile } = useProfile();

  const [teams, setTeams] = useState<[] | null>(null);
  const [collaborators, setCollaborators] = useState<[] | null>(null);

  const [team, setTeam] = useState<any>(null);

  const [collaboratorsModal, setCollaboratorsModal] = useState(false);

  const fetchTeams = useCallback(async () => {
    try {
      const response = await api.get("/teams", {
        headers: { Authorization: `Bearer ${profile?.access_token}` },
      });
      setTeams(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  }, [profile]);

  const fetchCollaborators = useCallback(async () => {
    try {
      const response = await api.get(`/teams/${team.id}/collaborators`, {
        headers: { Authorization: `Bearer ${profile?.access_token}` },
      });
      setCollaborators(response.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  }, [profile, team]);

  useEffect(() => {
    if (!teams) fetchTeams();
  }, [teams, fetchTeams]);

  useEffect(() => {
    if (team) fetchCollaborators();
  }, [team, fetchCollaborators]);

  function handleOpenCollaboratorsModal() {
    setCollaboratorsModal(true);
  }

  function handleCloseCollaboratorsModal() {
    setCollaboratorsModal(false);
  }

  function handleClickTeam(team: any) {
    setTeam(team);
    handleOpenCollaboratorsModal();
  }

  if (!teams) return null;

  return (
    <div>
      {teams.map((team: any) => (
        <div key={team.id} style={{marginBottom: "0.5rem"}}>
          <a href="#!" onClick={() => handleClickTeam(team)}>
            {team.name}
          </a>
        </div>
      ))}

      {team && (
        <Modal
          state={collaboratorsModal}
          setState={setCollaboratorsModal}
          title={`Colaboradores - ${team.name}`}
        >
          {collaborators && (
            <CollaboratorsList
              close={handleCloseCollaboratorsModal}
              collaborators={collaborators}
              refreshCollaborators={fetchCollaborators}
              team_id={team.id}
            />
          )}
        </Modal>
      )}

      <div className="d-flex justify-end">
        <button className="button cancel" type="button" onClick={close}>
          VOLTAR
        </button>
      </div>
    </div>
  );
};

export default TeamsList;
