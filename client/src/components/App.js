import React from "react";
import ProductIndex from "./products/ProductIndex";
import { Route, Router, Switch } from "react-router-dom";

const App = () => {
  return (
    <div>
      <h1>Online Store</h1>
      <Switch>
        {/* <Route exact path="/login" component={Login} /> */}
        <Route path="/" component={ProductIndex} />
      </Switch>
    </div>
  );
};

export default App;
