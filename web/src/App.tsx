import React, { useState } from "react";
import { GlobalStyles } from "./assets/styles/GlobalStyles";
import LoadingSpinner from "./components/LoadingSpinner";
import { LoadingSpinnerContext } from "./contexts/loadingSpinner";
import { ProfileContext, ProfileProvider } from "./contexts/profile";
import { Router } from "./routes";

function App() {
  const { profile, setProfile } = ProfileProvider();
  const [loadingSpinner, setLoadingSpinner] = useState(true);

  return (
    <React.Fragment>
      <ProfileContext.Provider value={{ profile, setProfile }}>
        <LoadingSpinnerContext.Provider
          value={{ loadingSpinner, setLoadingSpinner }}
        >
          {loadingSpinner && <LoadingSpinner />}
          <Router />
        </LoadingSpinnerContext.Provider>
      </ProfileContext.Provider>
      <GlobalStyles />
    </React.Fragment>
  );
}

export default App;
