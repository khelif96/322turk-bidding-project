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
        bidderIds : [],
        createdDate : "",
        isActive : false,
        title : "",
        content : "",
        ownerID : "",
        totalBids : [],
        winningBid : {},
        demandID : this.props.match.params.id
      }
      this.getDemandbyID = getDemandbyID.bind(this);
      this.displayContent = this.displayContent.bind(this);
      this.displayContent();
  }


  displayContent(){
      const DemandID = this.state.demandID;
      this.getDemandbyID(DemandID)
      .then( (response) =>{
        this.setState({

          bidderIds : response.bidderIds,
          createdDate : response.createdDate,
          isActive : response.isActive,
          title : response.title ,
          content : response.content,
          ownerID : response.ownerID,
          totalBids : response.totalBids,
          winningBid : response.winningBid,

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
