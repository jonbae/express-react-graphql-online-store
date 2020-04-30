import gql from "graphql-tag";

export const FETCH_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
    }
  }
`;

export const FETCH_PRODUCT = gql`
  query fetchProduct($_id: ID!) {
    product(_id: $_id) {
      name
      description
      weight
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
