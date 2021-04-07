import { gql } from "@apollo/client"

const fragmentPost = gql`
  fragment Post on Post {
    _id
    content
    attachment
    creator{
      username
      email
    }
    createdAt
    updatedAt
  }
`;

export const postsQuery = gql`
  query getPosts($where: JSON, $sort: String, $skip: Int, $limit: Int) {
    getPosts(where: $where, sort: $sort, skip: $skip, limit: $limit) {
      ...Post
    }
  }
  ${fragmentPost}
`;

export const postMutation = gql`
  mutation createPost($content: String!, $attachment:Upload, $creator:String!){
    createPost(content: $content, attachment:$attachment, creator:$creator){
      ...Post
    }
  }
  ${fragmentPost}
`;