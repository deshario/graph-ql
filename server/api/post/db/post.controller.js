import Post from './post.model'

const calculateSkip = (page, size) => (page - 1) * size;

const calculateTotalPages = (count, size) => Math.ceil(count / size);

const postController = {
  getPosts: async(args, context = {}) => {
    return await Post.find(args.where).sort(args.sort || {createdAt: -1}).skip(args.skip || 0).limit(args.limit || false).populate("creator");
  },
  getPaginatedPosts: async(args, context = {}) => {
    const { page, size } = args
    const mPage = page || 1
    const mSize = size || 25
    const [posts, totalPosts] = await Promise.all([
      Post.find(args.where).populate("creator").skip(calculateSkip(mPage, mSize)).limit(mSize).exec(),
      Post.countDocuments().exec(),
    ]);
    return {
      pagination:{
        currentPage: parseInt(mPage),
        totalPages: calculateTotalPages(totalPosts, mSize),
        itemsPerPage: posts.length,
        totalItems: totalPosts
      },
      posts
    }
  },
  createPost: async (args, context = {}) => {
    const { content, creator } = args
    const newPost = new Post({ content, creator })
    const post = await newPost.save()
    return post
  },
  updatePost: async(args, context={}) => {
    const updateObj = JSON.parse(JSON.stringify(args));
    delete updateObj._id
    const updatedPost = await Post.findByIdAndUpdate({ _id:args._id }, updateObj, {new: true});
    return updatedPost;
  },
  deletePost: async(args, context={}) => {
   return await Post.findOneAndDelete({_id: args._id});
  }
}

export { postController }