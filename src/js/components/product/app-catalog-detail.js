'use strict';
import React from 'react';
import { Link } from 'react-router';
import AppStore from './../../stores/app-store';
import StoreWatchMixin from './../../mixins/store-watch-mixin';
import AppActions from './../../actions/app-actions';
import CartButton from './../cart/app-cart-button';

// This function will be passed to StoreWatchMixin who will pass the component's props to it
// This is why we added the props in the constructor and _onChange methods. This component is
// rendered by react router and it's taking its props from the Link componet from app-catalog-item
const getCatalogItem = (props) => {
  // We load the full catalog from the AppStore. We then use the new ES6 Array.prototype.find 
  // method over the returned Array. We pass it in a function that will take as an argument the
  // ES6 destructured item as an object with only the id. In the body of the func we then
  // compare to see if the id of the item is equal with the id passed in via the url as :item
  // from react-router. The way we access url params from react-router is with props.params
  const item = AppStore.getCatalog().find(({ id }) => id === props.params.item);
  return {item};
};

const CatalogDetail = ( props ) => {
  return (
    <div>
      <h4>{props.item.title}</h4>
      <img src="http://placehold.it/250x250" />
      <p>{props.item.description}</p>
      <p>
        ${props.item.cost}
        <span className="text-success">
          {/*
            We are checking if there are any props.item.qty - if we have qty it means the
            item is added in cart. Then, if first statement is true, we use ES6 string 
            templates to show the number of items in the cart using ${props.item.qty}
          */}
          { props.item.qty && ` (${props.item.qty} in cart)` }
        </span>
      </p>
      {/* We pass the handler with bind because we want to pass the function with parameter
          without calling the action itself  
      */}
      <div className="btn-group">
        <Link to="/" className="btn btn-default btn-sm">Continue Shopping</Link> 
        <CartButton handler={AppActions.addItem.bind(null, props.item)} txt="Add to cart" />
      </div>
    </div>
  );
};

export default StoreWatchMixin(CatalogDetail, getCatalogItem);

