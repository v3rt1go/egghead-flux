'use strict';
import React from 'react';
import Catalog from './catalog/app-catalog';
import CatalogDetail from './product/app-catalog-detail';
import Cart from './cart/app-cart';
import Template from './app-template';
import { Router, Route, IndexRoute } from 'react-router';

const App = () => {
  return (
    <Router>
      {/* 
        This will be our root route. It's path is / and the
        main component to be rendered when accessed is Template.
        This means that Template will also be rendered for any routes
        nested under this root path
      */}
      <Route path="/" component={Template}>
        {/*
          This nested routes will appear inside the Template component
          They will be passed in as props.children to the Template component
        */}
        {/* 
          IndexRoute is the default component to show when our path matches
          that of our parent's Route path. So basically when it's the index
          of the parent path (same path). Here we define the main component 
          that we want to render for this route
        */}
        <IndexRoute component={Catalog} />
        <Route path="/cart" component={Cart} />
        <Route path="/item/:item" component={CatalogDetail} />
      </Route>
    </Router>
  );
};

// NOTE: We don't need this anymore because we are defining our components using
// react-router
//class App extends React.Component {
  //render() {
    //return (
      //<div className="container">
        //<Catalog />
        //<Cart />
      //</div>
    //);
  //}
//}

export default App;
