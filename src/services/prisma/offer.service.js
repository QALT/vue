import { apolloClient } from "./apolloClient";
import store from "../../store";
import gql from "graphql-tag";
import {handleError} from "../../helpers/prisma/error";

export default {
    getOffers() {
        return apolloClient.query({
            query: gql`
                query {
                    offers {
                        id,
                        title,
                        description,
                        applications {
                            applicant {
                                id
                            }
                        },
                        tags {
                            label
                        }
                    }
                }
            `,
            fetchPolicy: 'no-cache'
        })
        .then(response => response.data.offers)
        .catch(console.error);
    },
    addOffer(title, description, selectedTags) {
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
            .catch(handleError);
    },
    getOffer(id) {
        return apolloClient.query({
            query: gql`
                query($id: ID!) {
                    offers(where:{id: $id}) {
                        id,
                        title,
                        description,
                        tags {
                            id,
                            label
                        }
                    }
                }
            `,
            variables: {
                id
            },
            fetchPolicy: "no-cache"
        })
            .then(response => response.data.offers[0])
            .catch(handleError);
    },
    editOffer(id, newOffer) {
        const selectedTags = newOffer.tags.map( tag => ({id:tag}));
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
                        title,
                        description,
                        tags {
                            id,
                            label
                        }
                    }
                }
            `,
            variables: {
                id,
                updatedOffer: {
                    title: newOffer.title,
                    description: newOffer.description,
                    tags: {
                        connect: selectedTags
                    }
                }
            }
        })
            .then(response => response.data.updateOffer)
            .catch(handleError);
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
            .catch(handleError);
    }
};
