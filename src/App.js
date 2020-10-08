import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/layout/Header";
import Contacts from "./components/contacts/Contacts";
import About from "./components/pages/About";
import AddContact from "./components/contacts/AddContact";
import EditContact from "./components/contacts/EditContact";
import NotFound from "./components/pages/NotFound";

import { Provider } from "./context";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div>
            <Header branding="CRUD Demo" />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact/add/" component={AddContact} />
                <Route exact path="/contact/edit/:id" component={EditContact} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
