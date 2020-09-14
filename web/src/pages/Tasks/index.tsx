import React from "react";
import { useProfile } from "../../contexts/profile";

// import { Container } from './styles';

const Tasks: React.FC = () => {
  const { profile, setProfile } = useProfile();

  function handleLogout() {
    localStorage.removeItem("access_token");
    setProfile(null);
  }

  return (
    <div>
      <h1>Olá, {profile?.name}</h1>
      <a href="#!" onClick={handleLogout}>
        Sair
      </a>
    </div>
  );
};

export default Tasks;
