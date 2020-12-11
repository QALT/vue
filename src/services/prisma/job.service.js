import { apolloClient } from "./apolloClient";
import gql from 'graphql-tag';

export default {
    getJobs() {
        return apolloClient.query({
            query: gql`
                query {
                    offers {
                        id,
                        title,
                        description
                    }
                }
            `
        })
        .then(response => response.data.offers)
        .catch(console.error);
    }
}