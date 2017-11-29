import styled from 'styled-components';
import { NavLink} from 'react-router-dom'
import {Navbar,NavDropdown} from 'react-bootstrap';

export const NavBarLink = styled(NavLink)`
  color : Black;
  text-decoration: none;
  font-size: 15px;
  display: block;
  padding : 5px;

  &:active{ color : gray;
            text-decoration: none;}
  &:hover{ color : gray;
           color: black;  }
`;

export const BrandDiv = styled.div`
  font-size : 30px;
  color : white;
  &:hover{ cursor : pointer }
  padding : 10px;
`
export const Logo = styled.div`
  color : white;
`
export const OurNavBar = styled(Navbar)`
  background-color : gray;
  color : white;
  &:hover{ cursor : pointer }
`;

export const Dropdown = styled(NavDropdown)`
    margin : 0;
    padding : 10px;
    &:active{ color : gray;
              text-decoration: none;}
`;
