import merge from "lodash/merge";
import { userResolver } from "./api/user/user.resolver";
import { postResolver } from "./api/post/post.resolver"
import { chatResolver } from "./api/chat/chat.resolver"

const resolvers = merge([
  userResolver,
  postResolver,
  chatResolver
]);

export default resolvers