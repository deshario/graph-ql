import Layout from './components/Layout';
import styled from "styled-components";
import Image from 'next/image'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

const Index = () => {

  const posts = [
    {name: 'post 1', cover:'https://q-xx.bstatic.com/images/hotel/max1024x768/116/116281465.jpg'},
    {name: 'post 2', cover:'https://cf.bstatic.com/images/hotel/max1024x768/116/116281457.jpg'}
  ];

  return (
    <Layout>
      <h1>Posts</h1>
      <CardContainer>
        {
          posts.map((e,k) => {
            return (
              <Card key={k} style={{position:'relative'}}>
                <CardImage src={e.cover} width={200} height={200} />
                <CardContent>
                  <CardTitle>{e.name}</CardTitle>
                  <CardDesc>lorem ipsum ipsum</CardDesc>
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
            )
          })
        }
      </CardContainer>
    </Layout>
  )
}

const CardContainer = styled.div`
  display:flex;
  padding:10px;
`

const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  margin:10px;
  min-width:300px;
  display:flex;
  flex-direction:column;
`;

const CardImage = styled(Image)`
  border-top-left-radius:5px;
  border-top-right-radius:5px;
`;

const CardContent = styled.div`
  padding:10px;
  display:flex;
  flex-direction:column
`;

const CardTitle = styled.span`
  font-weight:bold;
  font-size:1.5em;
  text-transform: capitalize;
`

const CardDesc = styled.span`
  color:gray;
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
  border-radius: 50%;
  cursor:pointer;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: all .2s ease-in-out; 
  color: #9E9E9E;

  &:hover{
    color: #607D8B;
    box-shadow: 0 5px 15px rgba(145, 92, 182, .4);
    transform: scale(1.1);
  }
`

export default Index