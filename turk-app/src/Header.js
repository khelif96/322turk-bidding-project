import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import CreateAccount from './CreateAccount';
import { Link } from 'react-router-dom'


class Header extends Component{
  render(){
      return(
        <Header>
        <nav><ul>
          <li><Link path ='/' > </ Link>Home</li>
          <li><Link path ='/CreateAccount' > </ Link>Login</li>
          <li><Link path ='/Login' > </ Link>Sign up</li>
        </ul>
        </nav></Header>
      );
  }
}

export default Header;
