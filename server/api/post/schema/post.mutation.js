import { gql } from 'apollo-server-express'

const postMutation = gql`
  extend type Mutation {
    createPost(title: String!, desc: String!, creator: String!): Post
    updatePost(_id:String!, title:String, desc: String): Post
    deletePost(_id:String!): Post
  }
`;

export { postMutation }