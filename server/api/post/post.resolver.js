import { postController } from './db/post.controller'

const postResolver = {
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
      return postController.createPost(args, context)
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