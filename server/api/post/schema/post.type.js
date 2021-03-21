import { gql } from 'apollo-server-express';

const postType = gql`
	type Post {
		_id: ObjectID!
		title: String!
		desc: String!
		creator: User!
	}

`;

export { postType }