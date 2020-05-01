import React from "react";
import ProductIndex from "./products/ProductIndex";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "../util/route_util";
import Login from "./Login";
import Nav from "./Nav";
import ProductDetail from "./products/ProductDetail";
import Register from "./Register";
import CreateProduct from "./products/CreateProduct";

const App = () => {
  return (
    <div>
      <h1>Online Store</h1>

      <Switch>
        <AuthRoute
          exact
          path="/register"
          routeType="auth"
          component={Register}
        />
        <AuthRoute exact path="/login" routeType="auth" component={Login} />
        <Route exact path="/nav" component={Nav} />

        <Route exact path="/createProduct" component={CreateProduct} />
        <Route exact path="/products/:productId" component={ProductDetail} />
        <Route path="/" component={ProductIndex} />
      </Switch>
    </div>
  );
};

export default App;
