const { gql } = require('apollo-server-express')

const userQuery = gql`
	scalar JSON

	type Query {
		getUsers(where: JSON, sort: String, skip: Int, limit: Int): [User]
		getUserById(_id: String!): User
	}
`
module.exports = userQuery