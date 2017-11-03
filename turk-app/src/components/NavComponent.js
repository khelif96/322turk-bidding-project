import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import '../App.css';

class NavComponent extends Component {

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">Turk App</Link>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <Link to="/minComponent">Profile</Link>
          </li>
          <li>
           <Link to="/Tasks">Tasks</Link>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/login"><button className="btn btn-info log">Log In</button></Link></li>
          {/* <li><button className="btn btn-danger log">Log out </button></li>*/}
        </ul>
      </nav>
    );
  }
}

export default NavComponent;
