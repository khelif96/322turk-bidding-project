import React, { Component } from 'react';
import '../../Styles/App.css';

class ChooseUser extends Component {

  constructor(props){
      super(props);
  }

  render() {
    var style =  {
        color : 'orange',
        fontSize : 100,
        textAlign : 'center'
    }
    return (
          <div style = {style}>
            <div> What type of user are you? </div>
          </div>
    );
  }
}

export default ChooseUser;
