import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Characters from "./container/Characters";
import Hero from "./container/Hero";
import Comics from "./container/Comics";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart);

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/hero/:id">
            <Hero />
          </Route>
          <Route path="/comics">
            <Comics />
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
