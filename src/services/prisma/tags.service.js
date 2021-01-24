import { apolloClient } from "./apolloClient";
import gql from "graphql-tag";

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
    }
};