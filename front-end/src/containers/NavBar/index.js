import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import Login from '../Login';
import Profile from '../Profile';
import TA_Survey from '../TA_Survey';
import './index.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
    };
  }

  render() {
    const { username } = this.state;

    const myNav =
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">TA Portal</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="/login">Login</NavItem>
          <NavItem eventKey={2} href="/profile">Profile</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>;


    return (
      <Router>
        <div>
          {myNav}
          <Route exact path='/' component={Login}/>
          <Route path='/login' render={props => (
            <Login {...props} />
          )}/>
          <Route path='/profile' render={props => (
            <Profile {...props} username={username} />
          )}/>
          <Route path='/ta-survey' render={props => (
            <TA_Survey {...props} username={username} />
          )}/>
        </div>
      </Router>
    );
  }
}

export default NavBar;
