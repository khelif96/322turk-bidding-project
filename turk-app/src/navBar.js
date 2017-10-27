import React, { Component } from 'react';
import './App.css';
import { Nav,Navbar,NavDropdown,MenuItem} from 'react-bootstrap';
import { NavLink,BrowserRouter,Route } from 'react-router-dom'
import Login from './Login';
import CreateAccount from './CreateAccount';

class NavBar extends Component {

  render() {
    return (
      <BrowserRouter>
      <div>
        <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/home">AMM Turk System</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
              <NavDropdown eventKey="1" title="" id="nav-dropdown">
                <MenuItem eventKey="1.1">
                <NavLink to ="/CreateAccount">CreateAccount</NavLink>
                </MenuItem>
                <MenuItem eventKey="1.2">
                <NavLink to = "/login">Login</NavLink>
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="1.3">
                About
                </MenuItem>
              </NavDropdown>
          </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Route path = "/CreateAccount" component = {CreateAccount}/>
        <Route path = "/Login" component = {Login}/>
      </div>

    </BrowserRouter>
    );
  }

}

export default NavBar;
