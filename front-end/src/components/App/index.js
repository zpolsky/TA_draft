import React, { Component } from 'react';
import './App.css';
import logo from '../../assets/washu-logo.png';

import NavBar from '../../containers/NavBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="logo"/>
        </header>
        <NavBar username="doug"/>
      </div>
    );
  }
}

export default App;
