import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginComponent from './components/LoginComponent';
import NavComponent from './components/NavComponent';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route } from 'react-router-dom';
import history from './utils/history'
function Page()  {
  return (
    <div className="container">

    <Router history={history}>
    <div>
      <Route path="/" component = {NavComponent}/><br/>
      <Route path="/Login" component = {LoginComponent}/>
      </div>
    </Router>
    </div>
  );
}
ReactDOM.render(<Page />, document.getElementById('root'));
registerServiceWorker();
