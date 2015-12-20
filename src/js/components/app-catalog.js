'use strict';
import React from 'react';
import AppStore from './../stores/app-store.js';
import CatalogItem from './app-catalog-item.js';

/**
 * Gets this component's initial state
 */
function getCatalog() {
  return { items: AppStore.getCatalog() };
}

class AppCatalog extends React.Component {
  constructor() {
    super();
    this.state = getCatalog();
  }

  render() {
    const items = this.state.items.map((item) => {
      return <CatalogItem key={item.id} item={item} />;
    });

    return (
      <div className="row">
        {items}
      </div>
    );
  }
}

export default AppCatalog;
