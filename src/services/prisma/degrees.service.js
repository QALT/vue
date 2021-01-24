import { apolloClient } from "./apolloClient";
import gql from "graphql-tag";
import {handleError} from "../../helpers/prisma/error";

export default {
    getDegrees() {
        return apolloClient.query({
            query: gql`
                query {
                    degrees{
                      id,
                      label,
                      updated_at
                    }
                  }
            `,
            fetchPolicy: "no-cache"
        })
            .then(response => response.data.degrees.map(degree => ({...degree, updatedAt: degree.updated_at})))
            .catch(handleError);
    },
    addDegree(label) {
        return apolloClient.mutate({
            mutation: gql`
                mutation($label: String!) {
                    createDegree(data: {
                        label: $label
                    }) {
                        id
                    }
                }
            `,
            variables: {
                label
            }
        })
            .then(response => response.data.createDegree)
            .catch(handleError);
    },
    getDegree(id) {
        return apolloClient.query({
            query: gql`
                query($id: ID!) {
                    degrees(where:{id: $id}) {
                        id,
                        label
                    }
                }
            `,
            variables: {
                id
            },
            fetchPolicy: "no-cache"
        })
            .then(response => response.data.degrees[0])
            .catch(handleError);
    },
    editDegree(id, updatedDegree) {
        return apolloClient.mutate({
            mutation: gql`
                mutation($id: ID!, $updatedDegree: DegreeUpdateInput!) {
                    updateDegree(
                        where: {
                          id: $id
                        }
                        data: $updatedDegree
                    ) {
                        id
                    }
                }
            `,
            variables: {
                id,
                updatedDegree
            }
        })
        .then(response => response.data.updateDegree)
        .catch(handleError);
    },
    deleteDegree(id) {
        return apolloClient.mutate({
            mutation: gql`
                mutation($id: ID!) {
                    deleteDegree(where:{id: $id}){
                        id
                    }
                }
            `,
            variables: { id }
        })
            .then(response => response.data.deleteDegree)
            .catch(handleError);
    }
};
