import { ApolloClient, InMemoryCache, split, ApolloLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client'
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from "@apollo/client/link/error";

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

const isClient = process?.browser;

const cache = new InMemoryCache({
	resultCaching: true,
});

const getAbsoluteUrl = () => {
  if(process.env.NODE_ENV !== "production"){
    return {
      http: "http://localhost:9000/playground",
      socket: "ws://localhost:9000/graphql"
    }
  }else{
    return {
      http: "http://localhost:9000/playground",
      socket: "wss://express-gql.com/graphql"
    }
  }
}

const httpLink = createUploadLink({
  uri: getAbsoluteUrl().http,
  credentials: 'same-origin'
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const splitLink = isClient ? split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  new WebSocketLink({
    uri: getAbsoluteUrl().socket,
    options: {
      reconnect: true,
    },
  }),
  httpLink,
) : httpLink;

const client = new ApolloClient({
	connectToDevTools: isClient,
	ssrMode: !isClient, // Prevents Apollo Client from refetching queries unnecessarily
	link: ApolloLink.from([errorLink, splitLink]),
	cache,
	//defaultOptions
});

export default client;