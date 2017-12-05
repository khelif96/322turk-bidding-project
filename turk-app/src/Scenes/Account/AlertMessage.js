import React, { Component } from 'react';
import '../../Styles/App.css';

class AlertMessage extends Component {

  constructor(props){
      super(props);
  }


  render() {

    const style ={ color : "orange"}
    return (
      <h1 style={ style }>
        {this.props.message}
      </h1>
    );
  }
}

export default AlertMessage;
