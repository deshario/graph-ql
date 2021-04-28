import { gql } from 'apollo-server-express';

const chatQuery = gql`
	extend type Query {
		getChats(where: JSON, sort: String, skip: Int, limit: Int): [Chat]
	}
`
export { chatQuery }