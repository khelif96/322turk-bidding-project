import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NavBar from './navBar';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<NavBar />, document.getElementById('root'));
registerServiceWorker();
