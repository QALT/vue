import { apolloClient } from "./apolloClient";
import gql from "graphql-tag";
import {handleError} from "../../helpers/prisma/error";

export default {
    getTags() {
        return apolloClient.query({
            query: gql`
                query {
                    tags{
                      id,
                      label
                    }
                  }
            `,
            fetchPolicy: "no-cache"
        })
        .then(response => response.data.tags)
        .catch(console.error);
    },
    getTag(id) {
        return apolloClient.query({
            query: gql`
                query($id: ID!) {
                    tags(where:{id: $id}) {
                        id,
                        label
                    }
                }
            `,
            variables: {
                id
            },
            fetchPolicy: 'no-cache'
        })
        .then(response => response.data.tags[0])
        .catch(console.error);
    },
    addTag(label) {
        return apolloClient.mutate({
            mutation: gql`
                mutation($label: String!) {
                    createTag(data: {
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
        .then(response => response.data.createTag)
        .catch(console.error)
    },
    editTag(id, updatedTag) {
        return apolloClient.mutate({
            mutation: gql`
                mutation($id: ID!, $updatedTag: TagUpdateInput!) {
                    updateTag(
                        where: {
                          id: $id
                        }
                        data: $updatedTag
                    ) {
                        id
                    }
                }
            `,
            variables: {
                id,
                updatedTag
            }
        })
        .then(response => response.data.updateTag)
        .catch(console.error)
    },
    deleteTag(id) {
        return apolloClient.mutate({
            mutation: gql`
                mutation($id: ID!) {
                    deleteTag(where:{id: $id}){
                        id
                    }
                }
            `,
            variables: { id }
        })
        .then(response => response.data.deleteTag)
        .catch(console.error)
    }
};
