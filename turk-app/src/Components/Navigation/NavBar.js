import React, { Component } from 'react';
import { Nav,MenuItem,Glyphicon} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {NavBarLink,BrandDiv,Logo,OurNavBar,Dropdown} from '../../Styles/NavBar.style'
import logo from "../../Assets/Logo-1.png"

class NavBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      user : false
    }

  }

  render() {
    const title = <div><Glyphicon glyph="align-justify"/> </div>;
    return (
      <OurNavBar>
        <Nav pullLeft>
            <LinkContainer to = '/'>
              <BrandDiv>
                <Logo>AMM Turk App</Logo>
              </BrandDiv>
            </LinkContainer>
        </Nav>

        <Nav pullRight>

          <Dropdown  eventKey="1" noCaret title = {title} >
            <MenuItem eventKey="1.2">

            {
              !this.props.enableLogout &&
              <NavBarLink to = "/RegisterUser">
                Register
              </NavBarLink>
            }

            </MenuItem>
            <MenuItem eventKey="1.3">

            {
              !this.props.enableLogout ?
              <NavBarLink to = "/Login">
                Login
              </NavBarLink>
              :
              <NavBarLink to ="/myAccount">
                My Account
              </NavBarLink>
            }

            </MenuItem>

            { this.props.enableLogout && <MenuItem divider />}
            <MenuItem eventKey="1.4">

              <NavBarLink to = "/MoreDemands">
                More Demands
              </NavBarLink>
            
            </MenuItem>

            <MenuItem eventKey="1.5">

              <NavBarLink to = "/MoreUsers">
                More Users
              </NavBarLink>

            </MenuItem>
            <MenuItem eventKey="1.6">
            {
              (localStorage.getItem('userType') == "Client") &&
              <NavBarLink to = "/RegisterDemand">
                Register Demand
              </NavBarLink>
            }
            </MenuItem>
            <MenuItem eventKey= "1.7">
              <NavBarLink to = "/aboutUs">
                About Us
              </NavBarLink>
            </MenuItem>
          </Dropdown>
        </Nav>

      </OurNavBar>
    );
  }
}

export default NavBar;
