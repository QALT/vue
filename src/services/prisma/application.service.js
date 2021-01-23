import { apolloClient } from "./apolloClient";
import store from '../../store';
import gql from 'graphql-tag';

export default {
    getUserApplications() {
        return apolloClient.query({
            query: gql`
                query($userId: ID!) {
                    applications(where: { applicant: { id: $userId}}) {
                        id,
                        comment,
                        status,
                        offer{
                            id,
                            title
                        }
                    }
                }
            `,
            variables: {
                userId: store.getters.getId
            },
            fetchPolicy: 'no-cache'
        })
        .then(response => response.data.applications)
        .catch(console.error);
    },
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
    getApplication(id) {
        return apolloClient.query({
            query: gql`
                query($id: ID!) {
                    application(where:{id: $id}) {
                        id,
                        comment,
                        offer {
                            id,
                            title
                        }
                    }
                }
            `,
            variables: {
                id
            },
            fetchPolicy: 'no-cache'
        })
        .then(response => response.data.application)
        .catch(console.error);
    },
    editApplication(id, newApplication) {
        return apolloClient.mutate({
            mutation: gql`
                mutation($id: ID!, $newComment: String!) {
                    updateApplication(
                        where: {
                          id: $id
                        }
                        data: { comment: $newComment }
                    ) {
                        id
                    }
                }
            `,
            variables: {
                id,
                newComment: newApplication.comment
            }
        })
        .then(response => response.data.updateApplication)
        .catch(console.error)
    },
    deleteApplication(id) {
        return apolloClient.mutate({
            mutation: gql`
                mutation($id: ID!) {
                    deleteApplication(where:{id: $id}){
                        id
                    }
                }
            `,
            variables: { id }
        })
        .then(response => response.data.deleteApplication)
        .catch(console.error)
    }
}