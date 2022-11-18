import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({message}) => {
            console.log(`Serveur error: ${message}`);
        });
    }
});

const link = from([
    errorLink,
    new HttpLink({uri: "http://localhost:3001/graphql"})
]);

export const clientGraphql = new ApolloClient({
    cache: new InMemoryCache({
        addTypename: false
    }),
    link
});