import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Characters from "./container/Characters";
import Hero from "./container/Hero";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/hero">
            <Hero />
          </Route>
          <Route path="/">
            <Characters />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
