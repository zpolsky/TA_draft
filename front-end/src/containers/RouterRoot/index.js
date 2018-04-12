import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Login from '../Login';
import Profile from '../Profile';
import TA_Survey from '../TA_Survey';
import TA_Draft from '../TA_Draft';
import NavBar from '../NavBar';

import checkLogin from '../../api/checkLogin';

class RouterRoot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: {},
      username: '',
      isLoggedIn: false,
      failedLogin: false,

    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // called when submit is pressed in login component
  handleSubmit(username, password) {
    checkLogin(username, password)
    .then(response => {
      this.setState({
        username,
        // user: {
        //   username,
        //   uid: response.uid,
        //   isActive: response.isActive,
        //   surveyCompleted: response.surveyCompleted
        // },
        isLoggedIn: response.success,
        failedLogin: !response.success
      });
    });
  }

  render() {
    const { username, isLoggedIn, failedLogin } = this.state;
    // const { username } = user;
    return (
      <Router>
        <div>
          {isLoggedIn &&
            <NavBar/>
          }
          <Route exact path='/' render={props => (
            <Login {...props} isLoggedIn={isLoggedIn} failedLogin={failedLogin} handleSubmit={this.handleSubmit} />
          )}/>
          <Route path='/login' render={props => (
            <Login {...props} isLoggedIn={isLoggedIn} failedLogin={failedLogin} handleSubmit={this.handleSubmit} />
          )}/>
          <Route path='/profile' render={props => (
            <Profile {...props} username={username} />
          )}/>
          <Route path='/ta-survey' render={props => (
            <TA_Survey {...props} username={username} />
          )}/>
          <Route path='/ta-draft' render={props => (
            <TA_Draft {...props} username={username} />
          )}/>
        </div>
      </Router>
    );
  }
}

export default RouterRoot;
