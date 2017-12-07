import styled from 'styled-components';
import {PanelGroup ,Panel,ButtonGroup,Button} from 'react-bootstrap';

export const DemandHeading = styled.div`
  font-size : 20px;
  color : BLACK;
  &:hover{ cursor : pointer;
          }
  text-align : center;
`

export const Logo = styled.img`
  height : 40px;
  width : 240px;
`
export const FeedContainer = styled.div`
    position: relative;
    margin: 3rem auto;
    max-width : 500px;
`;

export const Organization = styled.div`
    font-size : 20px;
    color : BLACK;
    text-align : center;

`;

export const DatePosted = styled.div`
    font-size : 20px;
    color : BLACK;
    text-align : center;

`;

export const Description = styled.p`
    text-indent: 40px;
    font-size : 15px;
    color : BLACK;
    text-align : left;

`;

export const SectionHeadings = styled.p`
    font-size : 18px;
    color : BLACK;
    text-align : left;

`;
export const MoreDetails = styled.div`
    font-size : 18px;
    color : orange;
    text-align : right;
    :hover{ text-decoration : none;
            }
`;

export const ChooseBidder = styled.button`
    font-size : 18px;
    color : orange;
    display: flex;
    justify-content: right;
    align-items: right;
    :hover{ text-decoration : none;
            }
`;
export const SwitchDemands = styled(ButtonGroup)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3rem auto;

`
