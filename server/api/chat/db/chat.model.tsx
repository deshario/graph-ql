import mongoose, { Schema } from 'mongoose';

const ChatSchema = new Schema({
  messages: [{
    message : String,
    sender : { type : Schema.Types.ObjectId, ref : 'User' },
    sendAt : Date
  }],
  participants: [{  type: Schema.Types.ObjectId, ref: 'User' }]
},
{
  timestamps: true, versionKey: false
})

const Chat = mongoose.model('Chat', ChatSchema);

export default Chat;