'use strict';
import React from 'react';
import AppStore from './../../stores/app-store.js';
import StoreWatchMixin from './../../mixins/store-watch-mixin';
import CatalogItem from './app-catalog-item.js';

/**
 * Gets this component's initial state
 */
function getCatalog() {
  return { items: AppStore.getCatalog() };
}

const Catalog = (props) => { 
  const items = props.items.map((item) => {
    return <CatalogItem key={item.id} item={item} />;
  });

  return (
    <div className="row">
      {items}
    </div>
  );
};

export default StoreWatchMixin(Catalog, getCatalog);
