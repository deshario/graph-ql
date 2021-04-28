import { gql } from 'apollo-server-express';

const chatType = gql`
  type Message {
		message: String!
		sender: User
    sendAt: Date
	}

	type Chat {
		_id: ObjectID!
		messages: [Message]!
		participants: [User]
    createdAt: Date
		updatedAt: Date
	}
`;

export { chatType }