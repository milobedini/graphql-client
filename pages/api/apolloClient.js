// describe endpoint and setup cache. Boilerplate basically.

import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://peacock-store.herokuapp.com/graphql/',
  cache: new InMemoryCache(),
})

export default client
