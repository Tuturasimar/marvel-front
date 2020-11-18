import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Characters from "./container/Characters";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/characters">
            <Characters />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
