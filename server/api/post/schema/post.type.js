import { gql } from 'apollo-server-express';

const postType = gql`
	type Post {
		_id: ObjectID!
		title: String!
		desc: String!
		creator: User!
	}

	type Pagination {
		currentPage: Int,
		totalPages: Int,
		itemsPerPage: Int,
		totalItems: Int,
	}

	type PaginatedPost {
		pagination: Pagination
		posts: [Post],
	}

`;

export { postType }