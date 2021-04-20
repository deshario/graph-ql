import mongoose from 'mongoose';

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String},
  email: { type: String},
},
{
  timestamps: true, versionKey: false
})

const User = mongoose.model('User', UserSchema);

export default User;