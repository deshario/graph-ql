import { postController } from './db/post.controller'
import { pubsub } from "../../config/pubsub";

const postResolver = {
	Subscription: {
		newPostPubSub: {
			subscribe: () => pubsub.asyncIterator(['POST_ADDED'])
		}
	},
	Query: {
		getPosts(parent, args, context) {
			return postController.getPosts(args,context)
		},
		getPaginatedPosts(parent, args, context) {
			return postController.getPaginatedPosts(args,context)
		},
	},
	Mutation: {
		createPost(parent, args, context) {
      const createdPost = postController.createPost(args, context)
			pubsub.publish('POST_ADDED', { newPostPubSub: createdPost });
			return createdPost;
		},
		updatePost(parent, args, context){
			return postController.updatePost(args,context);
		},
		deletePost(parent, args, context){
			return postController.deletePost(args,context)
		}
	},
}

export { postResolver }