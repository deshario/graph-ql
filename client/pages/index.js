import Layout from "./components/Layout"
import styled from "styled-components"
import React, { useEffect, useState, useCallback } from "react"
import { FaCamera, FaFileAlt, FaMicrophone } from "react-icons/fa"
import { useQuery, useMutation } from "@apollo/client"
import { postsQuery, postMutation } from "../documents"
import Posts from "./components/Posts"
import Spinner from "./components/Spinner"

const Index = () => {
  const [newPost, setNewPost] = useState("")
  const [createPost, { loading:mutationLoading }] = useMutation(postMutation);

  const { data, loading:postLoading, error } = useQuery(postsQuery)
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    if(!postLoading && data){
      setPosts(data.getPosts);
    }
  }, [postLoading, data]);

  const createPoster = () => {
    const authorId = "605703b1d1143818eda6fd9f"
    createPost({
      variables: {
        content: newPost,
        image: "sample.png",
        creator: authorId,
      },
      update: (cache, { data: { createPost } }) => {
        /*
          const existingPosts = cache.readQuery({ query: postsQuery });
          cache.writeQuery({ query: postsQuery, data: { getPosts: allData } });
        */
        const allData = [createPost, ...posts];
        setPosts(allData);
        setNewPost('');
      }
    })
  }

  const memoizedCallback = useCallback((event) => {
    setNewPost(event.target.value)
  },[newPost]);

  return (
    <Layout>
      <Row className="row">
        <FeedContainer className="col-md-8">
          <FeedCreator>
            <TextArea
              rows="4"
              placeholder="What's on your mind?"
              onChange={memoizedCallback}
              value={newPost}
            ></TextArea>
            <Flexbox justifyContent="space-between" algItems="center">
              <Flexbox marginTop="20px">
                <FeedActionBtn>
                  <FaCamera />
                </FeedActionBtn>
                <FeedActionBtn>
                  <FaFileAlt />
                </FeedActionBtn>
                <FeedActionBtn>
                  <FaMicrophone />
                </FeedActionBtn>
              </Flexbox>
              <FeedButton onClick={() => createPoster()} disabled={mutationLoading}>POST</FeedButton>
            </Flexbox>
          </FeedCreator>

          {/* <QueryPost /> */}

          { postLoading ? <Spinner mL="15px" mR="15px"/> : <Posts payloads={posts} /> }

        </FeedContainer>
        <SuggestionContainer className="col-md-4">
          <h3>Suggestions</h3>
          <People>
            <span>Professor</span>
          </People>
          <People>
            <span>Berlin</span>
          </People>
        </SuggestionContainer>
      </Row>
    </Layout>
  )
}

const FeedContainer = styled.div`
  margin-bottom:15px;
`

const FeedCreator = styled.div`
  display: flex;
  background: white;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  padding: 10px 10px 0px 10px;
`

const TextArea = styled.textarea`
  resize: none;
  padding: 10px;
  border: none;
  :focus {
    border: none;
    outline: 0;
  }
`

const Flexbox = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction == "column" ? "column" : "row"};
  justify-content: ${(props) => props.justifyContent};
  margin-top: ${(props) => props.marginTop};
  margin-left: ${(props) => props.marginLeft};
  align-items: ${(props) => props.algItems};
`

const FeedActionBtn = styled.div`
  padding: 10px;
`

const Row = styled.div`
  margin-top: 10px;
`

const FeedButton = styled.button`
  color: white;
  background: ${(props) => props.disabled ? 'gray' : 'rgb(27, 27, 27)'};
  padding: 5px 10px;
  border: none;
  :disabled {
    cursor: not-allowed;
  }
`

const SuggestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background: white;
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  border-radius: 2px;
  margin-bottom: 10px;

  @media (max-width: 920px) {
    max-width: unset;
  }
`

const People = styled.div`
  margin-top: 20px;
`

export default Index