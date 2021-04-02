import Layout from './components/Layout';
import styled from "styled-components";
import Image from 'next/image'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { useQuery } from '@apollo/client';

import { postsQuery } from '../documents'

const Index = () => {

  const getRandomPic = () => {
    const posts = [
      {name: 'post 1', cover:'https://q-xx.bstatic.com/images/hotel/max1024x768/116/116281465.jpg'},
      {name: 'post 2', cover:'https://cf.bstatic.com/images/hotel/max1024x768/116/116281457.jpg'}
    ];
    return posts[Math.floor(Math.random()*posts.length)].cover;
  }

  const QueryPost = () => {
    const { loading, error, data } = useQuery(postsQuery);
    if (loading) return <h1>Loading</h1>
    if (error) <h1>Error</h1>
    if(data && data.getPosts){
      const dataOk = data.getPosts;
      return dataOk.map((e,i) => {
        return (
          <Card key={i}>
            <CardImage src={getRandomPic()} width={200} height={200} />
            <CardContent>
              <CardTitle>{e.title}</CardTitle>
              <CardDesc>{e.desc}</CardDesc>
            </CardContent>
            <CardAction>
              <CardActionBtn>
                <FaPencilAlt/>
              </CardActionBtn>
              <CardActionBtn>
                <FaTrashAlt/>
              </CardActionBtn>
            </CardAction>
          </Card>
        );
      })
    }
  }

  return (
    <Layout>
      <Info>Click here to create new post</Info>
      <CardContainer>
        <QueryPost/>
      </CardContainer>
    </Layout>
  )
}

const Info = styled.div`
  background:#42A5F5;
  display:flex;
  padding:10px 10px 10px 20px;
  margin:10px 20px 0px 20px;
  border-radius:5px;
  color:white;
`

const CardContainer = styled.div`
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  padding:10px 20px;
  gap:10px;

  @media only screen and (max-width: 920px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Card = styled.div`
  position:relative;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  display:flex;
  flex-direction:column;
  transition: all .2s ease-in-out;
  cursor:pointer;

  &:hover{
    box-shadow: 0 5px 15px rgba(145, 92, 182, .4);
    transform: scale(1.01);
  }

  @media (max-width: 920px){
    max-width:unset;
  }
`;

const CardImage = styled(Image)`
  border-top-left-radius:5px;
  border-top-right-radius:5px;
`;

const CardContent = styled.div`
  padding:10px;
  display:flex;
  flex-direction:column;
`;

const CardTitle = styled.span`
  font-weight:bold;
  font-size:1.5em;
  text-transform: capitalize;
`

const CardDesc = styled.span`
  color:gray;
  font-size:0.9em;
  text-align: justify;
  margin-top:7px;
  line-height:1.6em;
`
const CardAction = styled.div`
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
  padding-top:2px;
  margin-left:5px;
  background-color: white;
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

export default Index