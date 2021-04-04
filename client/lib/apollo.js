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
	resultCaching: true,
});

const link = createHttpLink({
	uri: '/playground',
  credentials: 'same-origin'
})

const client = new ApolloClient({
	connectToDevTools: false,
	ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
	link,
	cache,
	//defaultOptions
});

export default client;