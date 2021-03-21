import Post from './post.model'

const calculateSkip = (page, size) => (page - 1) * size;

const calculateTotalPages = (count, size) => Math.ceil(count / size);

const postController = {
  getPosts: async(args, context = {}) => {
    return await Post.find(args.where).sort(args.sort || '_id').skip(args.skip || 0).limit(args.limit || false).populate("creator");
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
    const { title, desc, creator } = args
    const newPost = new Post({ title, desc, creator })
    const post = await newPost.save()
    return post
  },
}

export { postController }