import { apolloClient } from "./apolloClient";
import store from '../../store';
import gql from 'graphql-tag';

export default {
    getOffers() {
        let query = null;
        if (store.getters.isEmployer) {
            query = {
                query: gql`
                    query($employerId: ID!) {
                        offers(where: { employer: { id: $employerId}}) {
                            id,
                            title,
                            description,
                            tags{
                                label
                            }
                        }
                    }
                `,
                variables: {
                    employerId: store.getters.getId
                }
            }
        } else {
            query = {
                query: gql`
                    query {
                        offers {
                            id,
                            title,
                            description,
                            tags{
                                label
                            }
                        }
                    }
                `
            }
        }

        return apolloClient.query(query)
        .then(response => response.data.offers)
        .catch(console.error);
    },
    addOffer(title, description,selectedTags) {
        selectedTags = selectedTags.map( tag => ({id:tag}));
        return apolloClient.mutate({
            mutation: gql`
                mutation($title: String!, $description: String!, $email: String!, $selectedTags:[TagWhereUniqueInput!] ) {
                    createOffer(data: {
                        title: $title, 
                        description: $description, 
                        employer: {
                            connect: {
                                email: $email
                            }
                        },
                        tags: {
                            connect: $selectedTags
                        } 
                    }) {
                        id,
                        title,
                        description,
                        employer {
                            id,
                            email
                        },
                        tags {
                            id,
                            label
                        }
                    }
                }
            `,
            variables: {
                title,
                description,
                email: store.getters.getEmail,
                selectedTags
                
            }
        })
        .then(response => response.data.createOffer)
        .catch(console.error)
    },
    getOffer(id) {
        return apolloClient.query({
            query: gql`
                query($id: ID!) {
                    offers(where:{id: $id}) {
                        id,
                        title,
                        description
                    }
                }
            `,
            variables: {
                id
            },
            fetchPolicy: 'no-cache'
        })
        .then(response => response.data.offers[0])
        .catch(console.error);
    },
    editOffer(id, newOffer) {
        return apolloClient.mutate({
            mutation: gql`
                mutation($id: ID!, $updatedOffer: OfferUpdateInput!) {
                    updateOffer(
                        where: {
                          id: $id
                        }
                        data: $updatedOffer
                    ) {
                        id,
                        description
                    }
                }
            `,
            variables: {
                id,
                updatedOffer: {
                    title: newOffer.title,
                    description: newOffer.description
                }
            }
        })
        .then(response => response.data.updateOffer)
        .catch(console.error)
    },
    deleteOffer(id) {
        return apolloClient.mutate({
            mutation: gql`
                mutation($id: ID!) {
                    deleteOffer(where:{id: $id}){
                        id
                    }
                }
            `,
            variables: { id }
        })
        .then(response => response.data.deleteOffer)
        .catch(console.error)
    }
}