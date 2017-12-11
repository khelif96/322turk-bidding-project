import styled from 'styled-components';
import {PanelGroup ,Panel,ButtonGroup,Button} from 'react-bootstrap';


export const ChooseBidder = styled.button`
    background-color : #004d40;
    display: flex;
    :hover{ text-decoration : none; }
    margin: auto;
    width: 50%;
    border: 3px solid #39796b;
    padding: 10px;
`;

export const ButtonText = styled.div`
    margin: auto;
    display: flex;
    color : white;
    font-size : 18px;
`;

export const HeadingText = styled.div`
    margin: auto;
    display: flex;
    color :  white;
    font-size : 18px;
`;

export const BidderPanel = styled(Panel)`
    margin-right: 5%;
    display:inline-block;
    justify-content: center;
    align-content: center;
    background-color : #39796b;
    text-align : center;
    width: 40%;
`;

export const BidLayout = styled.div`
    margin : auto;
    position: relative;
    display : inline;
    justify-content: center;
    left: 9%;

`;

export const WinningBidLayout = styled.div`
    margin-left: 34%;

`;
