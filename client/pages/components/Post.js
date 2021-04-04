import React from 'react'
import styled from "styled-components";
import Image from 'next/image';
import { FaCog } from 'react-icons/fa';

const Post = ({title, desc}) => {
  console.log(' > Post Rendered ')
  return (
    <Card>
      <CardContent>
        <AuthorRoot>
            <AuthorIcon src="/assets/images/avatar.png" width="50" height="50"/>
            <Flexbox direction="column" marginLeft="10px">
              <AuthorTitle>{title}</AuthorTitle>
              <AuthorDesc>3 days ago</AuthorDesc>
            </Flexbox>
        </AuthorRoot>
        <CardDesc>{desc}</CardDesc>
        {/* <CardImage src={getRandomPic()} width={200} height={200} /> */}
      </CardContent>
      <CardActions>
        <CardActionBtn>
          <FaCog/>
        </CardActionBtn>
      </CardActions>
    </Card>
  )
}

export default React.memo(Post)

const Flexbox = styled.div`
  display:flex;
  flex-direction: ${props => props.direction == 'column' ? 'column' : 'row'};
  justify-content: ${props => props.justifyContent};
  margin-top: ${props => props.marginTop};
  margin-left: ${props => props.marginLeft};
  align-items: ${props => props.algItems};
`

const Card = styled.div`
  position:relative;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  display:flex;
  flex-direction:column;
  transition: all .2s ease-in-out;
  cursor:pointer;

  padding:5px 10px 10px 10px;
  border-radius: 2px;
  background:white;
  margin-bottom:10px;

  @media (max-width: 920px){
    max-width:unset;
  }
`;

const CardImage = styled(Image)``;

const AuthorRoot = styled.div`
  display:flex;
`

const AuthorIcon = styled(Image)``;

const AuthorTitle = styled.span`
  font-weight:bold;
  text-transform: capitalize;
`;

const AuthorDesc = styled.span``;

const CardContent = styled.div`
  padding:10px;
  display:flex;
  flex-direction:column;
`;

const CardDesc = styled.span`
  color:gray;
  font-size:0.9em;
  text-align: justify;
  margin:10px 0px;
  line-height:1.6em;
`
const CardActions = styled.div`
  color:#607D8B;
  padding-top:7px;
  padding-right:7px;
  display: flex;
  justify-content:space-around;
  position:absolute;
  right:0;
`;

const CardActionBtn = styled.span`
  height: 25px;
  width: 25px;
  background-color: white;
  
  display:flex;
  justify-content:center;
  align-items:center;

  color: #9E9E9E;
  border-radius: 50%;
  cursor:pointer;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: all .2s ease-in-out; 
  text-align: center;

  &:hover{
    color: #607D8B;
    box-shadow: 0 5px 15px rgba(145, 92, 182, .4);
    transform: scale(1.1);
  }
`