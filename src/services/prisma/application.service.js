import { apolloClient } from "./apolloClient";
import store from '../../store';
import gql from 'graphql-tag';

export default {
    // getOffers() {
    //     return apolloClient.query({
    //         query: gql`
    //             query {
    //                 offers {
    //                     id,
    //                     title,
    //                     description
    //                 }
    //             }
    //         `,
    //         fetchPolicy: 'no-cache'
    //     })
    //     .then(response => response.data.offers)
    //     .catch(console.error);
    // },
    addApplication(offerId, customMessage) {
        return apolloClient.mutate({
            mutation: gql`
                mutation($offerId: ID!, $email: String!, $customMessage: String) {
                    createApplication(data: {
                        comment: $customMessage,
                        offer: { connect: { id: $offerId}},
                        applicant: { connect: { email: $email}}
                    }) {
                        id,
                        status,
                        comment,
                        offer {
                            id,
                            title
                        }
                    }
                }
            `,
            variables: {
                offerId,
                customMessage,
                email: store.getters.getEmail
            }
        })
        .then(response => response.data.createApplication)
        .catch(console.error)
    },
    // getOffer(id) {
    //     return apolloClient.query({
    //         query: gql`
    //             query($id: ID!) {
    //                 offers(where:{id: $id}) {
    //                     id,
    //                     title,
    //                     description
    //                 }
    //             }
    //         `,
    //         variables: {
    //             id
    //         },
    //         fetchPolicy: 'no-cache'
    //     })
    //     .then(response => response.data.offers[0])
    //     .catch(console.error);
    // },
    // editOffer(id, newOffer) {
    //     return apolloClient.mutate({
    //         mutation: gql`
    //             mutation($id: ID!, $updatedOffer: OfferUpdateInput!) {
    //                 updateOffer(
    //                     where: {
    //                       id: $id
    //                     }
    //                     data: $updatedOffer
    //                 ) {
    //                     id,
    //                     description
    //                 }
    //             }
    //         `,
    //         variables: {
    //             id,
    //             updatedOffer: {
    //                 title: newOffer.title,
    //                 description: newOffer.description
    //             }
    //         }
    //     })
    //     .then(response => response.data.updateOffer)
    //     .catch(console.error)
    // },
    // deleteOffer(id) {
    //     return apolloClient.mutate({
    //         mutation: gql`
    //             mutation($id: ID!) {
    //                 deleteOffer(where:{id: $id}){
    //                     id
    //                 }
    //             }
    //         `,
    //         variables: { id }
    //     })
    //     .then(response => response.data.deleteOffer)
    //     .catch(console.error)
    // }
}