import merge from "lodash/merge";
import { userResolver } from "./user/user.resolver";

const resolvers = merge([
  userResolver,
]);

export default resolvers