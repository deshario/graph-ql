import { gql } from "@apollo/client"

const fragmentPost = gql`
  fragment Post on Post {
    _id
    title
    desc
    creator{
      email
    }
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