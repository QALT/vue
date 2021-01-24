import { apolloClient } from "./apolloClient";
import gql from "graphql-tag";

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
            .catch(console.error);
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
            .catch(console.error);
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
            .catch(console.error);
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
            .catch(console.error);
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
            .catch(console.error);
    }
};