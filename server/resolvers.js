const merge = require("lodash/merge");
const userResolver = require("./user/user.resolver");

const resolvers = merge([
  userResolver,
]);

module.exports = resolvers