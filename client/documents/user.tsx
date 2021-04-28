import { gql } from "@apollo/client"

const fragmentUser = gql`
  fragment User on User {
    _id
    username
    email
    createdAt
    updatedAt
  }
`;

export const UsersQuery = gql`
  query getUsers($where: JSON, $sort: String, $skip: Int, $limit: Int) {
    getUsers(where: $where, sort: $sort, skip: $skip, limit: $limit) {
      ...User
    }
  }
  ${fragmentUser}
`;