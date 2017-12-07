import React, { Component } from 'react';
import '../Styles/App.css';

class Bidder extends Component {
  constructor(props){
      super(props);
  }

  render() {
    const style ={ color : "orange"}
    return (
      <h1 style={ style }>
        {this.props.ID}
      </h1>
    );
  }
}

export default Bidder;
