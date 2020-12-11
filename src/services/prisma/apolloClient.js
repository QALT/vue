import ApolloClient from 'apollo-boost'
import store from '../../store';

export const apolloClient = new ApolloClient({
    uri: process.env.VUE_APP_GRAPHQL_HTTP,
    headers: {
      authorization: `Bearer ${store.getters.getToken}`
    }
  })