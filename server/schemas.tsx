import merge  from "lodash/merge";
import { userType, userQuery, userMutation }  from "./api/user/schema";
import { postType, postQuery, postMutation, postSubscription } from "./api/post/schema"
import { chatType, chatQuery, chatMutation } from "./api/chat/schema"

const schemas = merge([
  userType, userQuery, userMutation,
  postType, postQuery, postMutation, postSubscription,
  chatType, chatQuery, chatMutation
]);

export default schemas;