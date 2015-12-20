'use strict';
import React from 'react';
import AppActions from './../actions/app-actions';
import CartButton from './app-cart-button';

/**
 * A stateless react component that represents a catalog item
 * to be displayed inside the app catalog
 */
const CatalogItem = (props) => {
  return (
    <div className="col-xs-6 col-sm-4 col-md-3">
      <h4>{props.item.title}</h4>
      <img src="http://placehold.it/250x250" width="100%" className="img-responsive" />
      <p>{props.item.summary}</p>
      <p>${props.item.cost}</p>
      {/* We pass the handler with bind because we want to pass the function with parameter
          without calling the action itself  
      */}
      <CartButton handler={AppActions.addItem.bind(null, props.item)} txt="Add to cart" />
    </div>
  );
};

export default CatalogItem;
