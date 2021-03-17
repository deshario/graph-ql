const { gql } = require('apollo-server-express')

const userMutation = gql`
	type Mutation {
		createUser(email: String!): User
	}
`;

module.exports = userMutation