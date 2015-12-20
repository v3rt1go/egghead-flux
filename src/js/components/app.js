'use strict';
import React from 'react';
import Catalog from './app-catalog';
import Cart from './app-cart';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Catalog />
        <Cart />
      </div>
    );
  }
}

export default App;
