import { apolloClient } from "./apolloClient";
import gql from 'graphql-tag';

export default {
    getUser(id) {
        return apolloClient.query({
            query: gql`
                query($id: ID!) {
                    user(where:{id: $id}) {
                        id,
                        email,
                        lastname,
                        firstname,
                        birthday,
                        address {
                            id,
                            country,
                            region,
                            postalCode,
                            town,
                            street
                        },
                        studies {
                            id,
                            label,
                            school,
                            degree {
                                id,
                                label
                            }
                        },
                        experiences {
                            id,
                            label,
                            description,
                            startDate,
                            endDate
                        }
                    }
                }
            `,
            variables: {
                id
            },
            fetchPolicy: 'no-cache'
        })
        .then(response => response.data.user)
        .catch(console.error);
    },
    editUser(id, user) {
        return apolloClient.mutate({
            mutation: gql`
                mutation($id: ID!, $updatedUser: UserUpdateInput!) {
                    updateUser(
                        where: {
                            id: $id
                        }
                        data: $updatedUser
                    ) {
                        email,
                        firstname,
                        lastname
                    }
                }
            `,
            variables: {
                id,
                updatedUser: {
                    email: user.email,
                    lastname: user.lastname,
                    firstname: user.firstname,
                    birthday: user.birthday,
                }
            }
        })
        .then(response => response.data.updateUser)
        .catch(console.error)
    },
}