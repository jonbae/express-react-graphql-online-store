import React from "react";
import { Query } from "react-apollo";
import { FETCH_PRODUCT } from "../../graphql/queries";

// import { useParams } from "react-router-dom";
// import { useParams } from "react-router";
const ProductDetail = ({ match }) => {
  const { productId } = match.params;
  console.log(productId);
  //   const test = { _id: id };
  return (
    <Query query={FETCH_PRODUCT} variables={{ _id: productId }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        return (
          <div>
            {data.product.name} - {data.product.description}
            <p>weight: {data.product.weight}</p>
          </div>
        );
      }}
    </Query>
  );
};

export default ProductDetail;
