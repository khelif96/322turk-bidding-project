import React, { Component } from 'react';
import {getDemandbyID} from '../Utils/Demand.js';
import {
  ContainerBG ,
  DemandHeaderBG,
  DemandBody,
  DemandTitle,
  DemandUserDate,
  DemandBodyHeaders,
  DemandBodyP,
  BidButton,
  BackButton
 }from '../Styles/Demand.style';
 import {Link} from 'react-router-dom';

class Demand extends Component {

  constructor(props){
      super(props);
      this.state = {
        demandID : this.props.match.params.api_token,
        ownerId : "",
        content : "",
        title : "",
        bidderIds : [],
        __v : 0,
        devChosen : false,
        isActive : false,
        totalBids : [],
        createdDate : ""
      }
      this.getDemandbyID = getDemandbyID.bind(this);
      this.displayContent = this.displayContent.bind(this);
      this.displayContent();
  }
//2017-11-10T19:57:56.710Z
  convertDate = (date) => ({
      year : date.substr(0,4),
      month : date.substr(5,2) ,
      day : date.substr(8,2) ,
      hour : date.substr(11,2) ,
      minutes : date.substr(14,2) ,
      seconds : date.substr(17,2)
  })

  displayContent(){
      const DemandID = this.state.demandID;
      this.getDemandbyID(DemandID)
      .then( (response) =>{
        const convertedCreated = this.convertDate(response.createdDate);
        this.setState({
          ownerId : response.ownerID,
          content : response.content,
          title : response.title ,
          bidderIds : response.bidderIds,
          __v : response.__v,
          devChosen : response.devChosen,
          isActive :  response.isActive,
          totalBids :  response.totalBids,
          createdDate : convertedCreated.month + "/" + convertedCreated.day + "/" + convertedCreated.year  ,
        })
        console.log(response)
      })

  }
  render(){
    return (

      <ContainerBG>
        <DemandHeaderBG>
          <DemandTitle>
            {this.state.title}
          </DemandTitle>

          <DemandUserDate>
            <div>
              By : {this.state.demandID}
            </div>

            <div>
              Posted : {this.state.createdDate}
            </div>
          </DemandUserDate>
        </DemandHeaderBG>
        <DemandBody>

          <DemandBodyHeaders>
            Description
          </DemandBodyHeaders>
          <DemandBodyP>
            {this.state.content}
          </DemandBodyP>

          <DemandBodyHeaders>
            Bidders:
          </DemandBodyHeaders>
          <DemandBodyP>
            {this.state.bidderIds}
          </DemandBodyP>


            <BidButton>
              Bid On Job
            </BidButton>

            <Link to = '/'>
              <BackButton>
                Back
              </BackButton>
            </Link>
        </DemandBody>

      </ContainerBG>

    );
  }
}



export default Demand;
