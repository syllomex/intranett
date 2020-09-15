import React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { useProfile } from "./contexts/profile";
import { IProfile } from "./interfaces/Profile";
import SignUp from "./pages/SignUp";

import SignIn from "./pages/SignIn";
import Tasks from "./pages/Tasks";

function CommonRoutes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/cadastro" exact component={SignUp} />
    </Switch>
  );
}

const AuthRoutes: React.FC<{ profile: IProfile | undefined }> = ({
  profile,
}) => {
  return (
    <Switch>
      <Route
        path="/tarefas"
        exact
        component={profile ? Tasks : () => <Redirect to="/" />}
      />
    </Switch>
  );
};

function Router() {
  const { profile } = useProfile();

  return (
    <BrowserRouter>
      <CommonRoutes />

      <AuthRoutes profile={profile} />
    </BrowserRouter>
  );
}

export { Router };
