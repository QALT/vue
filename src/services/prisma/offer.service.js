import { apolloClient } from "./apolloClient";
import store from '../../store';
import gql from 'graphql-tag';

export default {
    getOffers() {
        return apolloClient.query({
            query: gql`
                query {
                    offers {
                        id,
                        title,
                        description
                    }
                }
            `
        })
        .then(response => response.data.offers)
        .catch(console.error);
    },
    addOffer(title, description) {
        return apolloClient.mutate({
            mutation: gql`
                mutation($title: String!, $description: String!, $email: String!) {
                    createOffer(data: {
                        title: $title, 
                        description: $description, 
                        employer: {
                            connect: {
                                email: $email
                            }
                        }
                    }) {
                        id,
                        title,
                        description,
                        employer {
                            id,
                            email
                            }
                        }
                }
            `,
            variables: {
                title,
                description,
                email: store.getters.getEmail
            }
        })
        .then(response => response.data.createOffer)
        .catch(console.error)
    }
}