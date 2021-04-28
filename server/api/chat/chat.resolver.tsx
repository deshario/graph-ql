import { chatController } from './db/chat.controller'

const chatResolver = {
	Query: {
		getChats(parent, args, context) {
			return chatController.getChats(args,context)
		},
	},
	Mutation: {
		createChat(parent, args, context) {
      return chatController.createChat(args, context);
		},
		updateChat(parent, args, context){
      return chatController.updateChat(args, context);
		}
	},
}

export { chatResolver }