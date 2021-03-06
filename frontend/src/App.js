import React, { Component } from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import Search from "./components/search";
import History from "./components/history";
import logo from "./logo.png";
import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="http://cc.ee.ntu.edu.tw/~ric/" target="_blank" rel="noopener noreferrer">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand" onClick={() => {if(window.location['href'].slice(-1)=="/"){window.location.reload()}}}>1e64 Searching engine</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/history" className="nav-link">history</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path="/" exact  component={Search} />
          <Route path="/history" component={History} />
        </div>
      </Router>
    );
  }
}

export default App;
