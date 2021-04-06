import mongoose from 'mongoose';

const { Schema, ObjectId } = mongoose

const PostSchema = new Schema({
  content: { type: String },
  attachment : { type: String },
  creator: { type: ObjectId, ref: 'User' },
},
{
  timestamps: true, versionKey: false
})

const Post = mongoose.model('Post', PostSchema);

export default Post;