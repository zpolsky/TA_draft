import React, { Component } from 'react';
import './App.css';
import logo from '../../assets/washu-logo.png';

import RouterRoot from '../../containers/RouterRoot';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="logo"/>
        </header>
        <RouterRoot/>
      </div>
    );
  }
}

export default App;
