import React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { useProfile } from "./contexts/profile";
import { IProfile } from "./interfaces/Profile";

import SignIn from "./pages/SignIn";
import Tasks from "./pages/Tasks";

function CommonRoutes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
    </Switch>
  );
}

const AuthRoutes: React.FC<{ profile: IProfile | undefined }> = ({
  profile,
}) => {
  if (!profile) return <Redirect to="/" />;

  return (
    <Switch>
      <Route path="/tarefas" exact component={Tasks} />
    </Switch>
  );
};

function Router() {
  const { profile } = useProfile();

  return (
    <BrowserRouter>
      <AuthRoutes profile={profile} />

      <CommonRoutes />
    </BrowserRouter>
  );
}

export { Router };
