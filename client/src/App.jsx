import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader";

import { SignUpSignInForm, PrivateRoute, Game } from "./components";

import "./styles/App.css";

const App = () => {
  return (
    <div className="app-container">
      <h1>Adventure Game</h1>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={() => <SignUpSignInForm register={false} />}
          />
          <Route
            path="/signup"
            component={() => <SignUpSignInForm register={true} />}
          />
          <PrivateRoute path="/game" component={Game} />
        </Switch>
      </Router>
    </div>
  );
};

export default hot(module)(App);
