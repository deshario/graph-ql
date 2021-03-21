import { gql } from 'apollo-server-express';

const postQuery = gql`
	extend type Query {
		getPosts(where: JSON, sort: String, skip: Int, limit: Int): [Post]
		getPaginatedPosts(where: JSON, page:Int, size: Int): PaginatedPost
	}
`
export { postQuery }