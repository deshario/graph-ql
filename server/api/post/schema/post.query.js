import { gql } from 'apollo-server-express';

const postQuery = gql`
	extend type Query {
		getPosts: [Post]
	}
`
export { postQuery }