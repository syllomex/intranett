import React from "react";
import { GlobalStyles } from "./assets/styles/GlobalStyles";
import { ProfileContext, ProfileProvider } from "./contexts/profile";
import { Router } from "./routes";

function App() {
  const { profile, setProfile } = ProfileProvider();

  return (
    <React.Fragment>
      <ProfileContext.Provider value={{ profile, setProfile }}>
        <Router />
      </ProfileContext.Provider>
      <GlobalStyles />
    </React.Fragment>
  );
}

export default App;
