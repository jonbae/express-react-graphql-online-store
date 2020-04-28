import gql from "graphql-tag";

export const FETCH_PRODUCTS = gql`
  {
    products {
      _id
      name
    }
  }
`;

export default {
  // it's this simple to query our cache!
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
};
