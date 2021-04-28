import { gql } from "@apollo/client"

const fragmentChat = gql`
  fragment Chat on Chat {
    _id
    messages{
      message
      sender{
        username
      }
      sendAt
    }
    participants{
      username
      email
    }
    createdAt
    updatedAt
  }
`;

export const ChatsQuery = gql`
  query getChats($where: JSON, $sort: String, $skip: Int, $limit: Int) {
    getChats(where: $where, sort: $sort, skip: $skip, limit: $limit) {
      ...Chat
    }
  }
  ${fragmentChat}
`;

// export const ChatMutation = gql`
//   mutation createChat($content: String!, $attachment:Upload, $creator:String!){
//     createChat(content: $content, attachment:$attachment, creator:$creator){
//       ...Chat
//     }
//   }
//   ${fragmentChat}
// `;

// export const ChatSubscription = gql`
//   subscription newChatPubSub {
//     newChatPubSub {
//       ...Chat
//     }
//   }
//   ${fragmentChat}
// `;