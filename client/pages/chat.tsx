import Layout from '../components/Layout';
import styled from "styled-components"
import { FlexBoxInterface, CardBoxInterface, ListInterface } from "../components/interface"
import { useState } from 'react'

const Chat = () => {

  const [activeChat, setActiveChat] = useState({ partnerName:'Megatron' }); // Optimus Prime // Megatron
  const [typingMsg, setTypingMsg] = useState('');

  const [partners, setPartners] = useState([
    { name: 'Optimus Prime' },
    { name: 'Bumble Bee' },
    { name: 'Megatron' },
    { name: 'Professor' },
    { name: 'Berlin' },
  ])

  const [allChats, setAllChats] = useState([
    {
      partner: 'Optimus Prime',
      payloads: [
        { msg: 'Hey! Do u need something', sender: 'Deshario' },
        { msg: 'No Thanks', sender: 'Megatron' },
        { msg: 'Howz going', sender: 'Deshario' }
      ]
    },
    {
      partner: 'Megatron',
      payloads: [
        { msg: 'hello', sender: 'Megatron' },
        { msg: 'Whats up buddy', sender: 'Deshario' },
        { msg: 'All great ... what about you', sender: 'Megatron' }
      ]
    }
  ]);

  const GetSpecificChat = () => {
    const chats = allChats.find((e:any) => e.partner == activeChat.partnerName);
    if(chats != undefined){
      return (
        <>
        {
          chats.payloads.map((chat:any, i:any) => {
            if(chat.sender != "Deshario"){
              return (
                <PartnerMsg key={i}>
                  <ChatIcon color="rgb(228 230 234)" width="20px" height="20px"/>
                  <span className="message">{chat.msg}</span>
                </PartnerMsg>
              )
            }else{
              return (
                <MyMsg key={i}>
                  <span className="message">{chat.msg}</span>
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

  const changeActiveChat = (partnerName:string) => {
    setActiveChat({
      partnerName: partnerName
    })
  }

  const onSubmitMsg = (e:any) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      const tempChats = JSON.parse(JSON.stringify(allChats));
      const chatIndex = tempChats.findIndex((e:any) => e.partner == activeChat.partnerName);
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
                  partners.map((partner,i) => {
                    return (
                      <ChatItem
                        key={i}
                        active={activeChat.partnerName === partner.name}
                        onClick={() => changeActiveChat(partner.name)}>
                        <ChatIcon />
                        <ChatOwner>
                          <span>{partner.name}</span>
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
              <span className="title">{activeChat.partnerName}</span>
            </ChatCHeader>
            <ChatCContent>
              <ChatMessages>
                <GetSpecificChat />
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
  margin-bottom:5px;

  > span.message {
    background:rgb(228 230 234);
    padding:10px;
    margin-left:5px;
    border-radius:10px;
    color:black;
    width:max-content;
  }
`;

const MyMsg = styled.div`
  display:flex;
  align-self: flex-end;
  align-items: flex-end;
  margin-bottom:5px;

  > span.message {
    background:#03A9F4;
    padding:10px;
    margin-right:5px;
    border-radius:10px;
    color:white;
    width:max-content;
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