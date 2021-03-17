import merge  from "lodash/merge";
import { userType, userQuery, userMutation }  from "./user/schema";

const typeDefs = merge([
  userType, userQuery, userMutation
]);

export default typeDefs;