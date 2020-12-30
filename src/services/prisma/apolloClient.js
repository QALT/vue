import ApolloClient from 'apollo-boost'
import store from '../../store';


export const apolloClient = new ApolloClient({
  uri: process.env.VUE_APP_GRAPHQL_URL,
  request: (operation) => {
    const token = store.getters.getToken;
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
});