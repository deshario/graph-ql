import { gql } from 'apollo-server-express';

const userMutation = gql`
	type Mutation {
		createUser(username:String!, email: String!): User
	}
`;

export { userMutation }