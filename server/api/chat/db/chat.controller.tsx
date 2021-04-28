import Chat from './chat.model'

const calculateSkip = (page, size) => (page - 1) * size;

const calculateTotalPages = (count, size) => Math.ceil(count / size);

interface ChatArgs {
  message?: string
  sender?: string
  participants?: [string]
}

const chatController = {
  getChats: async(args, context = {}) => {
    return await Chat.find(args.where).sort(args.sort || {createdAt: -1})
    .skip(args.skip || 0)
    .limit(args.limit || false)
    .populate("messages.sender")
    .populate("participants");
  },
  createChat: async (args:ChatArgs, context = {}) => {
    const { message, sender, participants } = args
    const newChat = new Chat({
      messages:{ message: message, sender: sender,sendAt:new Date() },
      participants:participants
    });
    return await newChat.save();
  },
  updateChat: async(args, context = {}) => {
    const { chatId, message, sender } = args;
    const newMsg = { message: message, sender: sender, sendAt:new Date() };
    const chatFound = await Chat.findOne({ _id:chatId });
    if(chatFound != undefined && chatFound != null){
      chatFound["messages"].push(newMsg);
      const savedChat = await chatFound.save();
      return await savedChat.populate('messages.sender').populate('participants').execPopulate();
    }else{
      return [];
    }
  }
}

export { chatController }