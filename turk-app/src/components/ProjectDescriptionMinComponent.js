import React, { Component } from 'react';
// import logo from '../logo.svg';
import './styles/loginComponent.css';

class ProjectDescriptionMinComponent extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState(
      {[event.target.name]: event.target.value}
    );
  }

  handleSubmit(event) {


    event.preventDefault();
  }

  render() {
    return (
      <div className="ProjectDescriptionMin">
        <h1>Title</h1>
      </div>

    );
  }
}

export default ProjectDescriptionMinComponent;
