import { apolloClient } from "./apolloClient";
import store from '../../store';
import gql from 'graphql-tag';

export default {
    getStudies() {
        return apolloClient.query({
            query: gql`
                query {
                    studies{
                      id,
                      label,
                      school
                    }
                  }
            `,
            fetchPolicy: 'no-cache'
        })
        .then(response => response.data.studies)
        .catch(console.error);
    },
    addStudy(label, school) {
        return apolloClient.mutate({
            mutation: gql`
                mutation($label: String!, $school: String!, $email: String!) {
                    createStudy(data: {
                        label: $label, 
                        school: $school, 
                        userAccount: {
                            connect: {
                                email: $email
                            }
                        }
                    }) {
                        id,
                        label,
                        school,
                        userAccount {
                            id,
                            email
                            }
                        }
                }
            `,
            variables: {
                label,
                school,
                email: store.getters.getEmail
            }
        })
        .then(response => response.data.createStudy)
        .catch(console.error)
    },
    getStudy(id) {
        return apolloClient.query({
            query: gql`
                query($id: ID!) {
                    studies(where:{id: $id}) {
                        id,
                        label,
                        school
                    }
                }
            `,
            variables: {
                id
            },
            fetchPolicy: 'no-cache'
        })
        .then(response => response.data.studies[0])
        .catch(console.error);
    },
    editStudy(id, newStudy) {
        return apolloClient.mutate({
            mutation: gql`
                mutation($id: ID!, $updatedStudy: StudyUpdateInput!) {
                    updateStudy(
                        where: {
                          id: $id
                        }
                        data: $updatedStudy
                    ) {
                        id,
                        label,
                        school
                    }
                }
            `,
            variables: {
                id,
                updatedStudy: {
                    label: newStudy.label,
                    school: newStudy.school
                }
            }
        })
        .then(response => response.data.updateStudy)
        .catch(console.error)
    },
    deleteStudy(id) {
        return apolloClient.mutate({
            mutation: gql`
                mutation($id: ID!) {
                    deleteStudy(where:{id: $id}){
                        id
                    }
                }
            `,
            variables: { id }
        })
        .then(response => response.data.deleteStudy)
        .catch(console.error)
    }
}