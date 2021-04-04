import Layout from './components/Layout';
import styled from "styled-components";
import React, { useState } from 'react';
import { FaCamera, FaFileAlt, FaMicrophone } from 'react-icons/fa';
import { useQuery } from '@apollo/client';

import { postsQuery } from '../documents'
import Post from './components/Post';

const Index = () => {

  const [newPost, setNewPost] = useState('')

  const createPost = () => {
    console.log('creating Post : ',newPost);
  }

  const QueryPost = React.memo(() => {
    console.log(' > QueryPost');
    const { loading, error, data } = useQuery(postsQuery);
    if (loading) return <h1>Loading</h1>
    if (error) <h1>Error</h1>
    if(data && data.getPosts){
      return data.getPosts.map((post,postIndex) => <Post key={postIndex} title={post.title} desc={post.desc} />)
    }
  },(prevProps, nextProps) => {
    return prevProps === nextProps;
  });

  return (
    <Layout>
      <Row className="row">
        <FeedContainer className="col-md-8">
          <FeedCreator>
            <TextArea rows="4" placeholder="What's on your mind?" onChange={(e) => setNewPost(e.target.value)}></TextArea>
            <Flexbox justifyContent="space-between" algItems="center">
              <Flexbox marginTop="20px">
                <FeedActionBtn><FaCamera/></FeedActionBtn>
                <FeedActionBtn><FaFileAlt/></FeedActionBtn>
                <FeedActionBtn><FaMicrophone/></FeedActionBtn>
              </Flexbox>
              <FeedButton onClick={createPost}>POST</FeedButton>
            </Flexbox>
          </FeedCreator>

          <QueryPost/>

        </FeedContainer>
        <div className="col-md-4" style={{background:'gray'}}>Right</div>
      </Row>
    </Layout>
  )
}


const FeedContainer = styled.div``

const FeedCreator = styled.div`
  display:flex;
  background:white;
  flex-direction:column;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  margin-bottom:10px;
  padding:10px 10px 0px 10px;
`

const TextArea = styled.textarea`
  resize:none;
  padding:10px;
  border:none;

  :focus{
    border:none;
    outline: 0;
  }
`

const Flexbox = styled.div`
  display:flex;
  flex-direction: ${props => props.direction == 'column' ? 'column' : 'row'};
  justify-content: ${props => props.justifyContent};
  margin-top: ${props => props.marginTop};
  margin-left: ${props => props.marginLeft};
  align-items: ${props => props.algItems};
`

const FeedActionBtn = styled.div`
  padding:10px;
`;

const Row = styled.div`
  margin-top:10px;
`

const FeedButton = styled.button`
  color:white;
  background: rgb(27,27,27);
  padding:5px 10px;
  border: none;
`
export default React.memo(Index)