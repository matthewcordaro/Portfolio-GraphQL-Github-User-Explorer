import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client"
import { ErrorLink } from "@apollo/client/link/error"
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from "@apollo/client/errors"

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql"

const httpLink = new HttpLink({
  uri: GITHUB_GRAPHQL_API,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
})

const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  } else if (CombinedProtocolErrors.is(error)) {
    error.errors.forEach(({ message, extensions }) =>
      console.log(
        `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(
          extensions
        )}`
      )
    )
  } else {
    console.error(`[Network error]: ${error}`)
  }
})

const link = ApolloLink.from([errorLink, httpLink])

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export default client
