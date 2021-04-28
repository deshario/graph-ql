import { gql } from 'apollo-server-express'

const chatMutation = gql`
  extend type Mutation {
    createChat(message: String!, sender:String!, participants: [String]!): Chat
    updateChat(chatId: String!, message: String!, sender:String!): Chat
  }
`;

export { chatMutation }