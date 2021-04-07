import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client'

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

const link = createUploadLink({
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