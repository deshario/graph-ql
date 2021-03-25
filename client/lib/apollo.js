import {
	ApolloClient,
	InMemoryCache,
	createHttpLink
} from '@apollo/client';

const defaultOptions = {
	watchQuery: {
		fetchPolicy: "no-cache",
		errorPolicy: "ignore",
	},
	query: {
		fetchPolicy: "no-cache",
		errorPolicy: "all",
	},
};

const cache = new InMemoryCache({
	resultCaching: false,
});

const link = createHttpLink({
	uri: '/playground',
  credentials: 'same-origin'
})

const client = new ApolloClient({
	connectToDevTools: false,
	link,
	cache,
	defaultOptions
});

export default client;