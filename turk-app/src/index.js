import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
<<<<<<< HEAD
import NavBar from './navBar';
=======
import LoginComponent from './components/LoginComponent';
import NavComponent from './components/NavComponent';
import ProjectDescriptionMinComponent from './components/ProjectDescriptionMinComponent';

>>>>>>> 83a432a387029be440657270c841f91f8ca15c0f
import registerServiceWorker from './registerServiceWorker';
import { Router, Route } from 'react-router-dom';
import history from './utils/history'
function Page()  {
  return (
    <div className="container">

<<<<<<< HEAD
ReactDOM.render(<NavBar />, document.getElementById('root'));
=======
    <Router history={history}>
    <div>
      <Route path="/" component = {NavComponent}/><br/>
      <Route path="/minComponent" component = {ProjectDescriptionMinComponent}/>
      <Route path="/Login" component = {LoginComponent}/>
      </div>
    </Router>
    </div>
  );
}
ReactDOM.render(<Page />, document.getElementById('root'));
>>>>>>> 83a432a387029be440657270c841f91f8ca15c0f
registerServiceWorker();
