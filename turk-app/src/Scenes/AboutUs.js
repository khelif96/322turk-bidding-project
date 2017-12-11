import React, { Component} from 'react';
import {Link} from 'react-router-dom';

import { Button, Row,Col,Nav,NavItem,Tab} from 'react-bootstrap';
import {getSiteStats} from '../Utils/User.js';
import {BarChart, Bar, Brush, Cell, CartesianGrid, ReferenceLine, ReferenceDot,
  XAxis, YAxis, Tooltip, Legend, ErrorBar, LabelList,Line} from 'recharts';



class AboutUs extends Component {
  constructor(props){
      super(props);
      this.state = {
        devCount : 0,
        clientCount : 0,
        siteStats : []

      }



      // this.getAccountInfo = this.getAccountInfo.bind(this);
      this.aboutUs();
  }




  aboutUs(){
     //call our axios promise, then retrieve the token from axios
     getSiteStats()
         .then( (count) => {
           //console.log(UserID);

           this.setState({
             devCount: count[0].value,
             clientCount : count[1].value,
             siteStats : count
            })
         })
         .catch( (error) => {
           alert("Error from : aboutUs page" + error);
         });
 }



  render() {
    return(
      <div>
        <center>
        <h1> Welcome To AMM </h1>
        <h2>A system that connects individuals with Big ideas with experts to help
        them make their ideas a reality</h2>
        <h3> Some Stats</h3>
        <BarChart
          width={700}
          height={500}
          data={this.state.siteStats}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis dataKey="value"/>
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Bar fill="#004d40" dataKey="value"  yAxisId={0} />
          <Bar fill="ORANGE" dataKey="value"  yAxisId={0} />

        </BarChart>
        <Link to="/registerUser">
          <Button>
            Get Started
          </Button>
        </Link>
        </center>
      </div>
    );
  }
}


export default AboutUs;
