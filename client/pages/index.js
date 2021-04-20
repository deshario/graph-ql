import Layout from "../components/Layout"
import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { FaCamera, FaFileAlt, FaMicrophone } from "react-icons/fa"
import { useQuery, useMutation, useSubscription } from "@apollo/client"
import { postsQuery, postMutation, postSubscription } from "../documents"
import Posts from "../components/Posts"
import Spinner from "../components/Spinner"

const Index = () => {

  const defaultPost = { content: '', attachment: null }
  const [newPost, setNewPost] = useState(defaultPost);
  const [ posts, setPosts ] = useState([]);

  const { data, loading:postLoading } = useQuery(postsQuery);
  const [createPost, { loading:mutationLoading }] = useMutation(postMutation);
  const { data:subscribedData } = useSubscription(postSubscription);

  const hiddenFileInput= React.useRef(null);

  if(subscribedData){
    console.log('subscribedData:',subscribedData)
  }

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
        <Flexbox className="col-md-3" direction="column" marginLeft="0px" marginRight="-10px" mLeft="10px" padding="0px" hideonMobile="none">
          <CardBox>
            <List>
              <ListHeader>Shortcuts</ListHeader>
              <ListItems>
                <ListItem>List2</ListItem>
                <ListItem>List3</ListItem>
              </ListItems>
            </List>
          </CardBox>
          <CardBox mTop="10px">
            <List>
              <ListHeader>Top Hit Series</ListHeader>
              <ListItems>
                <ListItem>Stranger Things</ListItem>
                <ListItem>Walking Dead</ListItem>
                <ListItem>Breaking Bad Dead</ListItem>
              </ListItems>
            </List>
          </CardBox>
        </Flexbox>
        <FeedContainer className="col-md-5">
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
        <CardBox className="col-md-3" padding="0px" mLeft="5px" hideonMobile="none">
          <List>
            <ListHeader>Characters</ListHeader>
            <ListItems>
              <ListItem>Professor</ListItem>
              <ListItem>Berlin</ListItem>
            </ListItems>
          </List>
        </CardBox>
      </Row>
    </Layout>
  )
}

const List = styled.div`
  margin-top: ${(props) => props.marginTop};
`

const ListHeader = styled.p`
  background:#607D8B;
  color:white;
  padding:10px;
  font-size:19px;
  margin-block-start: 0;
  margin-block-end: 0;
`

const ListItem = styled.p`
  line-height:1.9em;
  padding-left:5px;
  padding-bottom:5px;
  margin-block-start: 0;
  margin-block-end: 0;
  :hover{
    color:red;
  }
`
const ListItems = styled.div`
  padding:15px;
`;

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

  @media (max-width: 920px) {
    display: ${(props) => props.hideonMobile};
  }
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
  display: flex;
  justify-content: center;

  @media (max-width: 920px) {
    display: block;
  }
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

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background: white;
  padding: ${(props) => props.padding == '' ? '20px' : props.padding};

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  border-radius: 2px;
  margin-bottom: 10px;
  margin-top: ${(props) => props.mTop};
  margin-left: ${(props) => props.mLeft};
  margin-right: ${(props) => props.mRight};
  
  height:max-content;

  @media (max-width: 920px) {
    max-width: unset;
    display: ${(props) => props.hideonMobile};
  }
`

export default Index