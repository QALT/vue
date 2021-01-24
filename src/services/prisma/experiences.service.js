import {handleError} from "../../helpers/prisma/error";
import { apolloClient } from "./apolloClient";
import store from "../../store";
import gql from "graphql-tag";

export default {
    getExperiences() {
        return apolloClient.query({
            query: gql`
                query {
                    experiences {
                        id,
                        label,
                        description,
                        startDate,
                        endDate
                    }
                }
            `,
            fetchPolicy: "no-cache"
        })
            .then(response => response.data.experiences)
            .catch(handleError);
    },
    addExperience(label, description, startDate, endDate) {
        return apolloClient.mutate({
            mutation: gql`
                mutation($label: String!, $description: String, $startDate: String!,
                    $endDate: String $email: String!) {
                    createExperience(data: {
                        label: $label, 
                        description: $description,
                        startDate: $startDate,
                        endDate: $endDate, 
                        userAccount: {
                            connect: {
                                email: $email
                            }
                        }
                    }) {
                        id,
                        label,
                        description,
                        startDate,
                        endDate,
                        userAccount {
                            email
                            }
                        }
                }
            `,
            variables: {
                label,
                description,
                startDate,
                endDate,
                email: store.getters.getEmail
            }
        })
            .then(response => response.data.createExperience)
            .catch(handleError);
    },
    getExperience(id) {
        return apolloClient.query({
            query: gql`
                query($id: ID!) {
                    experiences(where:{id: $id}) {
                        id,
                        label,
                        description,
                        startDate,
                        endDate
                    }
                }
            `,
            variables: {
                id
            },
            fetchPolicy: "no-cache"
        })
            .then(response => response.data.experiences[0])
            .catch(handleError);
    },
    editExperience(id, newExperience) {
        return apolloClient.mutate({
            mutation: gql`
                mutation($id: ID!, $updatedExperience: ExperienceUpdateInput!) {
                    updateExperience(
                        where: {
                          id: $id
                        }
                        data: $updatedExperience
                    ) {
                        label,
                        description,
                        startDate,
                        endDate
                    }
                }
            `,
            variables: {
                id,
                updatedExperience: {
                    label: newExperience.label,
                    description: newExperience.description,
                    startDate: newExperience.startDate,
                    endDate: newExperience.endDate
                }
            }
        })
            .then(response => response.data.updateExperience)
            .catch(handleError);
    },
    deleteExperience(id) {
        return apolloClient.mutate({
            mutation: gql`
                mutation($id: ID!) {
                    deleteExperience(where:{id: $id}){
                        id
                    }
                }
            `,
            variables: { id }
        })
            .then(response => response.data.deleteExperience)
            .catch(handleError);
    }
};
