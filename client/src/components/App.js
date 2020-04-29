import React from "react";
import ProductIndex from "./products/ProductIndex";
import Login from "./Login";
import Nav from "./Nav";
import Register from "./Register";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "../util/route_util";

const App = () => {
  return (
    <div>
      <h1>Online Store</h1>

      <Switch>
        <AuthRoute path="/nav" routeType="protected" component={Nav} />
        <AuthRoute
          exact
          path="/register"
          routeType="auth"
          component={Register}
        />

        <AuthRoute exact path="/login" routeType="auth" component={Login} />
        <Route path="/" component={ProductIndex} />
      </Switch>
    </div>
  );
};

export default App;
