import { apolloClient } from "./apolloClient";
import store from '../../store';
import gql from 'graphql-tag';

export default {
    getStudies() {
        return apolloClient.query({
            query: gql`
                query {
                    studies {
                        id,
                        title,
                        description
                    }
                }
            `,
            fetchPolicy: 'no-cache'
        })
        .then(response => response.data.offers)
        .catch(console.error);
    },
    addStudy(label, school) {
    },
    getStudy(id) {
    },
    editStudy(id, newStudy) {
    },
    deleteStudy(id) {
    }
}