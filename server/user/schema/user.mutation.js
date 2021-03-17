import { gql } from 'apollo-server-express';

const userMutation = gql`
	type Mutation {
		createUser(email: String!): User
	}
`;

export { userMutation }