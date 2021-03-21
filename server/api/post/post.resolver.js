import { postController } from './db/post.controller'

const postResolver = {
	Query: {
		getPosts() {
			return postController.getPosts()
		},
	},
	Mutation: {
		createPost(parent, args, context) {
      return postController.createPost(args, context)
		},
	},
}

export { postResolver }