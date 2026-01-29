import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const GRAPHQL_URL = "https://api.tarkov.dev/graphql";

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_URL }),
  cache: new InMemoryCache(),
});
