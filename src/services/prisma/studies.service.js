import { apolloClient } from "./apolloClient";
import store from "../../store";
import gql from "graphql-tag";
import {handleError} from "../../helpers/prisma/error";

export default {
    getStudies() {
        let query = {
            query: gql`
                query {
                    studies{
                        id,
                        label,
                        school,
                        degree {
                            label
                        }
                    }
                  }
            `,
            fetchPolicy: "no-cache"
        };

        if (store.getters.isEmployee) {
            query = {
                query: gql`
                    query ($userId: ID) {
                        studies(where: { userAccount: { id: $userId } }) {
                            id,
                            label,
                            school,
                            degree {
                                label
                            }
                        }
                      }
                `,
                variables: {
                    userId: store.getters.getId
                },
                fetchPolicy: "no-cache"
            }
        }

        return apolloClient.query(query)
            .then(response => response.data.studies)
            .catch(handleError);
    },
    addStudy(label, school, degree) {
        degree = {id:degree};
        return apolloClient.mutate({
            mutation: gql`
                mutation($label: String!, $school: String!, $email: String!, $degree:DegreeWhereUniqueInput) {
                    createStudy(data: {
                        label: $label, 
                        school: $school, 
                        userAccount: {
                            connect: {
                                email: $email
                            }
                        },
                        degree: {
                            connect: $degree
                        },
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
                email: store.getters.getEmail,
                degree
            }
        })
            .then(response => response.data.createStudy)
            .catch(handleError);
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
            fetchPolicy: "no-cache"
        })
            .then(response => response.data.studies[0])
            .catch(handleError);
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
            .catch(handleError);
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
            .catch(handleError);
    }
};
