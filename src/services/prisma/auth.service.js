import { apolloClient } from "./apolloClient";
import gql from "graphql-tag";

export default {
    login(email, password) {
        return apolloClient.mutate({
            mutation: gql`
                mutation($email: String!, $password: String!) {
                    login(email: $email, password: $password) {
                        token
                    }
                }
            `,
            variables: {
                email,
                password
            }
        })
            .then(response => response.data.login)
            .catch(() => {throw new Error("Bad credentials");});
    },
    register(email, password, lastname, firstname, role) {
        return apolloClient.mutate({
            mutation: gql`
                mutation($email: String!, $password: String!, $lastname: String, $firstname: String, $role: String!) {
                    signup(email: $email, password: $password, lastname: $lastname, firstname: $firstname, role: $role) {
                        token
                    }
                }
            `,
            variables: {
                email,
                password,
                lastname,
                firstname,
                role
            }
        })
            .then(response => response.data.signup);
    }
};