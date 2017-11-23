import React, { Component } from 'react';
import { Nav,Navbar,NavDropdown,MenuItem} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {NavBarLink,BrandDiv,Logo,OurNavBar} from '../../Styles/NavBar.style'
import logo from "../../Assets/Logo-1.png"

class NavBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      user : false
    }

  }

  render() {
    return (
      <OurNavBar>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to = '/'>
              <BrandDiv>
                <Logo>AMM Turk App</Logo>
              </BrandDiv>
            </LinkContainer>
          </Navbar.Brand>
        </Navbar.Header>

        <Nav pullRight>
          <NavDropdown pullRight eventKey="1" title="" id="nav-dropdown">
            <MenuItem eventKey="1.2">
              <NavBarLink to = "/RegisterVolunteer">
                Register
              </NavBarLink>
            </MenuItem>
            <MenuItem eventKey="1.3">
            <NavBarLink to = "/Login">
              Login
            </NavBarLink>
            </MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="1.4">
              <NavBarLink to = "/PostList">
                Posted Services
              </NavBarLink>
            </MenuItem>
            <MenuItem eventKey="1.5">
              <NavBarLink to = "/myAccount">My Account
              </NavBarLink>
            </MenuItem>
            <MenuItem eventKey="1.6">
              <NavBarLink to = "/RegisterJob">
                Register Job
              </NavBarLink>
            </MenuItem>
          </NavDropdown>
        </Nav>

      </OurNavBar>
    );
  }
}

export default NavBar;
