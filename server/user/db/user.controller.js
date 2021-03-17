const User = require('./user.model')

const userController = {
  getUsers: async (data) => {
    return User
    .find(data.where)
    .sort(data.sort || '_id')
    .skip(data.skip || 0)
    .limit(data.limit || false)
  },
  getUserById: async (data) => {
    return User.findOne({ _id: data._id })
  },
  createUser: async (data, context = {}) => {
    const { username, email } = data
    const newUser = new User({ username, email })
    const user = await newUser.save()
    return user
  },
}

module.exports = userController