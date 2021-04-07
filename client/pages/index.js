import Layout from "./components/Layout"
import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { FaCamera, FaFileAlt, FaMicrophone } from "react-icons/fa"
import { useQuery, useMutation } from "@apollo/client"
import { postsQuery, postMutation } from "../documents"
import Posts from "./components/Posts"
import Spinner from "./components/Spinner"

const Index = () => {

  const defaultPost = { content: '', attachment: null }
  const [newPost, setNewPost] = useState(defaultPost);
  const [ posts, setPosts ] = useState([]);

  const { data, loading:postLoading } = useQuery(postsQuery);
  const [createPost, { loading:mutationLoading }] = useMutation(postMutation);

  const hiddenFileInput= React.useRef(null);

  useEffect(() => {
    if(!postLoading && data){
      setPosts(data.getPosts);
    }
  }, [postLoading, data]);

  const onContentChange = (event) => setNewPost({ ...newPost, content:event.target.value });

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    setNewPost({
      ...newPost,
      attachment: fileUploaded
    });
  };

  const chooseFile = () => hiddenFileInput.current.click();

  const createPoster = () => {
    const authorId = "605703b1d1143818eda6fd9f"
    createPost({
      variables: {
        content: newPost.content,
        attachment: newPost.attachment,
        creator: authorId,
      },
      update: (cache, { data: { createPost } }) => {
        /*
          const existingPosts = cache.readQuery({ query: postsQuery });
          cache.writeQuery({ query: postsQuery, data: { getPosts: allData } });
        */
        const allData = [createPost, ...posts];
        setPosts(allData);
        setNewPost(defaultPost);
      }
    })
  }

  return (
    <Layout>
      <Row className="row">
        <FeedContainer className="col-md-8">
          <FeedCreator>
            <TextArea rows="4" placeholder="What's on your mind?" onChange={onContentChange} value={newPost.content}></TextArea>
            <Flexbox justifyContent="space-between" algItems="flex-start" bg="#607D8B"  marginLeft="-10px" marginRight="-10px">
              <Flexbox marginLeft="10px" marginRight="10px" marginTop="5px">
                <FeedActionBtn>
                  <FaCamera />
                </FeedActionBtn>
                <FeedActionBtn>
                  <FaFileAlt onClick={chooseFile}/>
                  <input type="file" accept="image/*" ref={hiddenFileInput} onChange={handleChange} style={{display: 'none'}} />
                </FeedActionBtn>
                <FeedActionBtn>
                  <FaMicrophone />
                </FeedActionBtn>
                <SelectedAttachment hide={newPost.attachment == null}>{newPost.attachment && newPost.attachment.name}</SelectedAttachment>
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
  padding: 5px 10px 5px 10px;
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
  margin-right: ${(props) => props.marginRight};
  align-items: ${(props) => props.algItems};
  background: ${(props) => props.bg};
`

const FeedActionBtn = styled.div`
  padding: 10px;
  color:white;
  cursor:pointer;

  :hover{
    transform: scale(1.5);
  }
`

const Row = styled.div`
  margin-top: 10px;
`

const FeedButton = styled.button`
  color: black;
  background: ${(props) => props.disabled ? '#607D8B' : '#EEEEEE'};
  padding: 5px 10px;
  border: none;
  margin:8px;
  border-radius:2px;

  :hover{
    background:#9E9E9E;
    color:white;
  }

  :disabled {
    background:#9E9E9E;
    color:white;
    cursor: not-allowed;
  }
`

const SelectedAttachment = styled.span`
  background:white;
  color:#455A64;
  display: ${(props) => props.hide ? 'none' : 'inline-block'};

  align-items:center;
  padding: 4px 10px;
  border-radius:5px;
  height:max-content;
  font-size:0.9em;
  cursor:pointer;
  margin-top:6px;
  margin-left:10px;

  :hover{
    background:#E0E0E0;
  }

  @media (max-width: 450px) {
    max-width:140px;
    -ms-text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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