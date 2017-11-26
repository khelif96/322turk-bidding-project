import styled from 'styled-components';
import { NavLink} from 'react-router-dom'
import {Navbar} from 'react-bootstrap';


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
  padding : 0px 0px 40px 0px;

`
export const Logo = styled.h3`
color : white;
padding : 0px 0px 40px 0px;

`
export const OurNavBar = styled(Navbar)`
  background-color : gray;
  &:hover{ cursor : pointer }
`;
