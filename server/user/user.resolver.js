const userController = require('./db/user.controller')

const userResolver = {
	Query: {
		getUsers(parent, args, context) {
			return userController.getUsers(args)
		},
		getUserById(parent, args, context) {
			return userController.getUserById(args);
		},
	},
	Mutation: {
		createUser(parent, args, context) {
      return userController.createUser(args, context)
		},
	}
}

module.exports = userResolver