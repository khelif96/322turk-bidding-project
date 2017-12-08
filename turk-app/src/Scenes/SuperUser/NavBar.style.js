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
  color : BLACK;
  &:hover{ cursor : pointer }
  padding : 10px 0px 50px 0px;

`
export const Logo = styled.img`
  height : 40px;
  width : 240px;
`
export const OurNavBar = styled(Navbar)`
  background-color : #FFCAAE;
  &:hover{ cursor : pointer }
`;
