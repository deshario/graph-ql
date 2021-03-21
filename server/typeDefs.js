import merge  from "lodash/merge";
import { userType, userQuery, userMutation }  from "./api/user/schema";
import { postType, postQuery, postMutation } from "./api/post/schema"

const typeDefs = merge([
  userType, userQuery, userMutation,
  postType, postQuery, postMutation
]);

export default typeDefs;