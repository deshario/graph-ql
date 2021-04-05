import { gql } from "@apollo/client"

const fragmentPost = gql`
  fragment Post on Post {
    _id
    content
    image
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
  mutation createPost($content: String!, $image:String, $creator:String!){
    createPost(content: $content, image:$image, creator:$creator){
      ...Post
    }
  }
  ${fragmentPost}
`;