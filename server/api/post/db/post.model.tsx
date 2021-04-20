import mongoose, {Schema, Document } from 'mongoose';

export interface PostInterface extends Document {
  content:string,
  attachment:string,
  creator:string
}

const PostSchema = new Schema({
  content: { type: String },
  attachment : { type: String },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
},
{
  timestamps: true, versionKey: false
})

const Post = mongoose.model<PostInterface>('Post', PostSchema);

export default Post;