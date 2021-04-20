import { gql } from 'apollo-server-express';

const postSubscription = gql`
	type Subscription {
		newPostPubSub: Post
	}
`;

export { postSubscription };