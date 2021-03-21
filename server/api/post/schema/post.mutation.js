import { gql } from 'apollo-server-express'

const postMutation = gql`
  extend type Mutation {
    createPost(title: String!, desc: String!, creator: String!): Post
  }
`;

export { postMutation }