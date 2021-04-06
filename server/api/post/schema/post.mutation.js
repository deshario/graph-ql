import { gql } from 'apollo-server-express'

const postMutation = gql`
  extend type Mutation {
    createPost(content: String!, attachment:String, creator: String!): Post
    updatePost(_id:String!, content:String): Post
    deletePost(_id:String!): Post
  }
`;

export { postMutation }