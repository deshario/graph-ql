import merge from "lodash/merge";
import { userResolver } from "./api/user/user.resolver";
import { postResolver } from "./api/post/post.resolver"

const resolvers = merge([
  userResolver,
  postResolver
]);

export default resolvers