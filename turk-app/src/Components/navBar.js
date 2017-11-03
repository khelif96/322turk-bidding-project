import React, { Component } from 'react';
import { Nav,Navbar,NavDropdown,MenuItem} from 'react-bootstrap';
import {Route,Router } from 'react-router-dom'
import {NavBarLink} from '../Styles/navBar.style'
import Login from '../Pages/Login';
import history from '../utils/history'

//import CreateAccount from '../Pages/CreateAccount';

class NavBar extends Component {

  render() {
    return (
      <Router history={history}>
      <div>
        <Navbar inverse >
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/home">AMM Turk System</a>
          </Navbar.Brand>
        </Navbar.Header>


          <Nav pullRight>
              <NavDropdown pullRight eventKey="1" title="" id="nav-dropdown">
                /*<MenuItem eventKey="1.1">
                <NavBarLink to ="/CreateAccount">Create an Account</NavBarLink>
                </MenuItem>*/
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

        <Route path = "/Login" component = {Login}/>
      </div>

    </Router>
    );
  }

}

export default NavBar;
