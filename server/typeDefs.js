const merge = require("lodash/merge");
const { userType, userQuery, userMutation } = require("./user/schema");

const typeDefs = merge([
  userType, userQuery, userMutation
]);

module.exports = typeDefs