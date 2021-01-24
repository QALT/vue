import { apolloClient } from "./apolloClient";
import store from "../../store";
import gql from "graphql-tag";
import {handleError} from "../../helpers/prisma/error";

export default {
    getUserApplications() {
        let query = null;
        if (store.getters.isEmployer) {
            query = {
                query: gql`
                    query($employerId: ID!) {
                        applications(where: { offer: { employer: { id: $employerId } }}) {
                            id,
                            comment,
                            status,
                            offer {
                                id,
                                title
                            },
                            applicant {
                                firstname,
                                lastname
                            }
                        }
                    }
                `,
                variables: {
                    employerId: store.getters.getId
                },
                fetchPolicy: "no-cache"
            };
        } else {
            query = {
                query: gql`
                    query($userId: ID!) {
                        applications(where: { applicant: { id: $userId}}) {
                            id,
                            title
                        }
                    }
                `,
                variables: {
                    userId: store.getters.getId
                },
                fetchPolicy: 'no-cache'
            }
        }

        return apolloClient.query(query)
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
            .catch(console.error);
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
            fetchPolicy: "no-cache"
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
            .catch(console.error);
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
            .catch(console.error);
    }
};
