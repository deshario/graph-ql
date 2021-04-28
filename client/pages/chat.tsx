import Layout from '../components/Layout';
import styled from "styled-components"
import { FlexBoxInterface, CardBoxInterface, ListInterface } from "../components/interface"
import { useEffect, useState } from 'react'
import { useQuery } from "@apollo/client"
import { ChatsQuery, UsersQuery } from "../documents"
import moment from "moment"

const Chat = () => {

  const { data:usersData, loading:userLoading } = useQuery(UsersQuery);
  const { data:chatData, loading:chatLoading } = useQuery(ChatsQuery);

  const [typingMsg, setTypingMsg] = useState('');

  const [partners, setPartners] = useState([]);
  const [activeChatPartner, setActiveChatPartner] = useState('');
  const [allChats, setAllChats] = useState([]);

  const GetSpecificChat = () => {

    const chatIndex :any = allChats.findIndex((e:any) => e.participants.every(
        (p:any) => p.username === "Deshario" || p.username === activeChatPartner
      )
    );

    let specificChat:any = [];
    if(chatIndex != -1){
      specificChat = allChats[chatIndex];
    }
    
    if(chatIndex != -1){
      return (
        <>
        {
          specificChat.messages.map((chat:any, i:any) => {
            if(chat.sender.username != "Deshario"){
              return (
                <PartnerMsg key={i}>
                  <ChatIcon color="rgb(228 230 234)" width="20px" height="20px"/>
                  <span className="message">{chat.message}</span>
                  <span className="timestamp">{moment(chat.sendAt).format("HH:MM")}</span>
                </PartnerMsg>
              )
            }else{
              return (
                <MyMsg key={i}>
                  <span className="timestamp">{moment(chat.sendAt).format("HH:MM")}</span>
                  <span className="message">{chat.message}</span>
                  <ChatIcon color="#03A9F4" width="20px" height="20px"/>
                </MyMsg>
              )
            }
          })
        }
      </>
      )
    }else{
      return <h1 style={{textAlign: 'center'}}>No Chats</h1>
    }
  }

  useEffect(() => {
    if(!userLoading && usersData){
      setPartners(usersData.getUsers);
      // setActiveChatPartner(usersData.getUsers[0].username) // FirstUser
      setActiveChatPartner(usersData.getUsers[1].username) // FirstUser
    }
    if(!chatLoading && chatData){
      setAllChats(chatData.getChats);
    }
  }, [userLoading, usersData, chatLoading, chatData]);

  const changeActiveChat = (partnerName:string) => {
    setActiveChatPartner(partnerName);
  }

  const onSubmitMsg = (e:any) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      const tempChats = JSON.parse(JSON.stringify(allChats));
      const chatIndex = tempChats.findIndex((e:any) => e.partner == activeChatPartner);
      if(chatIndex != undefined){
        const chatFound = tempChats[chatIndex];
        const payloads = chatFound.payloads;
        payloads.push({ msg:typingMsg, sender:"Deshario" });
        tempChats[chatIndex] = chatFound;
        setAllChats(tempChats);
        setTypingMsg('');
      }
    }
  }

  return (
    <Layout>
      <Row className="row">
        <Flexbox className="col-md-3" direction="column" marginTop="0px" padding="0px">
          <CardBox enableBorderRight={true}>
            <ChatHeader>Chats</ChatHeader>
            <List>
              <ChatList>
                {
                  partners.map((partner:any,i) => {
                    return (
                      <ChatItem
                        key={i}
                        active={activeChatPartner === partner.username}
                        onClick={() => changeActiveChat(partner.username)}>
                        <ChatIcon />
                        <ChatOwner>
                          <span>{partner.username}</span>
                          <span>3 minutes ago</span>
                        </ChatOwner>
                      </ChatItem>
                    )
                  })
                }
              </ChatList>
            </List>
          </CardBox>
        </Flexbox>
        <Flexbox className="col-md-9" direction="column" marginTop="0px" padding="0px">
          <CardBox>
            <ChatCHeader>
              <ChatIcon color="#5AD539"/>
              <span className="title">{activeChatPartner}</span>
            </ChatCHeader>
            <ChatCContent>
              <ChatMessages>
                <GetSpecificChat/>
              </ChatMessages>
              <ChatInputBox>
                <ChatInput value={typingMsg} onKeyDown={onSubmitMsg} onChange={(e) => setTypingMsg(e.target.value)}/>
              </ChatInputBox>
            </ChatCContent>
          </CardBox>
        </Flexbox>
      </Row>
    </Layout>
  )
}

const Flexbox = styled.div<FlexBoxInterface>`
  display: ${props => props.display || "flex"};
  flex-direction: ${props => props.direction || "row"};
  justify-content: ${props => props.justifyContent};
  margin-top: ${props => props.marginTop};
  margin-left: ${props => props.marginLeft};
  margin-right: ${props => props.marginRight};
  align-items: ${props => props.algItems};
  background: ${props => props.bg};
  padding: ${props => props.padding};
  height: calc(100vh - 80px);

  max-height: 100%;

  @media (max-width: 920px) {
    display: ${props => props.hideonMobile};
  }
`

const Row = styled.div`
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  @media (max-width: 920px) {
    display: block;
  }
`

const CardBox = styled.div<CardBoxInterface>`
  display: flex;
  flex-direction: column;
  position: relative;
  background: #FFFFFF;

  border-right: ${(props) => props.enableBorderRight ? '1px solid #ebebeb' : ''};

  cursor: pointer;
  border-radius: 2px;
  margin-top: ${(props) => props.mTop};
  margin-left: ${(props) => props.mLeft};
  margin-right: ${(props) => props.mRight};

  height:100% !important;
  
  // height:max-content;

  @media (max-width: 920px) {
    max-width: unset;
    display: ${(props) => props.hideonMobile};
  }
`

const ChatHeader = styled.h1`
  padding-left:20px;
  margin-block:10px;
`;

const List = styled.div<ListInterface>`
  margin-top: ${props => props.marginTop};
`

const ChatList = styled.div``;

interface ChatIconInterface{
  width?:string
  height?:string
  color?:string
}

const ChatIcon = styled.span<ChatIconInterface>`
  width: ${props => props.width ? props.width : '25px'};
  height: ${props => props.width ? props.width : '25px'};
  background-color: ${props => props.color ? props.color : '#bbb'};
  border-radius: 50%;
  display: inline-block;
`

interface ChatItemInterface{
  active?:boolean
}

const ChatItem = styled.div<ChatItemInterface>`
  display:flex;
  padding:15px;
  line-height:1.9em;
  border-bottom: 1px solid #ebebeb;

  background: ${(props) => props.active ? '#ebebeb' : ''};

  :first-child {
    border-top: 1px solid #ebebeb;
  }

  :hover{
    background:#ebebeb;
  }
`

const ChatOwner = styled.div`
  display:flex;
  flex-direction:column;
  margin-left:15px;
  margin-top:-5px;

  > span {
    font-size:14px;
    
    :nth-child(2) {
      font-size:12px;
      margin-top:-5px;
    }
  }
`

const ChatCHeader = styled.div`
  display:flex;
  align-items:center;
  padding:17px 10px 17px 15px;
  border-bottom: 1px solid #ebebeb;

  > span.title {
    font-size: 1.3em;
    font-weight: bold;
    margin-left:10px;
  }
`

const ChatCContent = styled.div`
  height:100%;
`

const ChatMessages = styled.div`
  display:flex;
  flex-direction:column;
  padding:10px;
  height: 560px;
  overflow-y:scroll;
  padding-bottom:20px;
`

const PartnerMsg = styled.div`
  display:flex;
  align-self: flex-start;
  align-items: flex-end;
  margin-top:15px;

  > span.timestamp{
    color:gray;
    margin-left:8px;
  }

  > span.message {
    background:rgb(228 230 234);
    padding:10px;
    margin-left:5px;
    border-radius:10px;
    color:black;
    width:max-content;
  }

  @media (max-width: 920px) {
    margin-bottom:15px;
  }
`;

const MyMsg = styled.div`
  display:flex;
  align-self: flex-end;
  align-items: flex-end;
  margin-bottom:15px;

  > span.timestamp{
    color:gray;
    margin-right:8px;
  }

  > span.message {
    background:#03A9F4;
    padding:10px;
    margin-right:5px;
    border-radius:10px;
    color:white;
    width:max-content;
  }

  @media (max-width: 920px) {
    margin-top:15px;
  }
`;

const ChatInputBox = styled.div`
  width:100%;
  position:absolute;
  bottom:0;
  padding:10px 10px 5px 10px;
`

const ChatInput = styled.textarea`
  width:100%;
  resize: none;
  padding: 5px 10px 5px 10px;
  border: none;
  border-radius:5px;
  background:#ebebeb;
  :focus {
    border: none;
    outline: 0;
  }
`

export default Chat