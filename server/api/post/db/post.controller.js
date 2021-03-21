import Post from './post.model'

const postController = {
  getPosts: async() => {
    const posts = await Post.find();
    return posts;
  },
  createPost: async (args, context = {}) => {
    const { title, desc, creator } = args
    const newPost = new Post({ title, desc, creator })
    const post = await newPost.save()
    return post
  },
}

export { postController }