import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./components/create-todo.component";
import TodosList from "./components/todos-list.component";
import logo from "./logo.png";

class App extends Component {
  state={
    history:[]
  }
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a cl assName="navbar-brand" href="http://cc.ee.ntu.edu.tw/~ric/" target="_blank" rel="noopener noreferrer">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">Searching engine</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                {
                  //<li className="navbar-item">
                  //  <Link to="/" className="nav-link">Todos</Link>
                  //</li>
                }
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">history</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          {
            //<Route path="/" exact component={TodosList} />
          }
          <Route path="/" exact component={CreateTodo} />
          <Route path="/create" component={TodosList} />
        </div>
      </Router>
    );
  }
}

export default App;