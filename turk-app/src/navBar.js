import React, { Component } from 'react';
import './App.css';
import { Nav,Navbar,NavDropdown,MenuItem} from 'react-bootstrap';
import { NavLink,BrowserRouter,Route } from 'react-router-dom'
import {NavBarLink} from './navBar.style'
import Login from './Login';
import CreateAccount from './CreateAccount';

class NavBar extends Component {

  render() {
    return (
      <BrowserRouter>
      <div>
        <Navbar inverse >
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/home">AMM Turk System</a>
          </Navbar.Brand>
        </Navbar.Header>


          <Nav pullRight>
              <NavDropdown pullRight eventKey="1" title="" id="nav-dropdown">
                <MenuItem eventKey="1.1">
                <NavBarLink to ="/CreateAccount">Create an Account</NavBarLink>
                </MenuItem>
                <MenuItem eventKey="1.2">
                <NavBarLink to = "/login">Login</NavBarLink>
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="1.3">
                About
                </MenuItem>
              </NavDropdown>
          </Nav>

        </Navbar>

        <Route path = "/CreateAccount" component = {CreateAccount}/>
        <Route path = "/Login" component = {Login}/>
      </div>

    </BrowserRouter>
    );
  }

}

export default NavBar;
