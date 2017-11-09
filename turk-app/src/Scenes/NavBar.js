import React, { Component } from 'react';
import { Nav,Navbar,NavDropdown,MenuItem} from 'react-bootstrap';
import {NavBarLink} from '../Styles/navBar.style'
//import CreateAccount from '../Pages/CreateAccount';

class NavBar extends Component {

  render() {
    return (

      <Navbar inverse >

        <Navbar.Header>
          <Navbar.Brand>
            <NavBarLink to = "/">AMM Turk System </NavBarLink>
          </Navbar.Brand>
        </Navbar.Header>


          <Nav pullRight>
              <NavDropdown pullRight eventKey="1" title="" id="nav-dropdown">

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

    );
  }

}

export default NavBar;
