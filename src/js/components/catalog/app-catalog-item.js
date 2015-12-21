'use strict';
import React from 'react';
import AppActions from './../../actions/app-actions';
import CartButton from './../cart/app-cart-button';
import { Link } from 'react-router';

/**
 * A stateless react component that represents a catalog item
 * to be displayed inside the app catalog
 */
const CatalogItem = (props) => {
  const itemStyle = {
    borderBottom: '1px solid #ccc',
    paddingBottom: 15
  };

  return (
    <div className="col-xs-6 col-sm-4 col-md-3" style={itemStyle}>
      <h4>{props.item.title}</h4>
      <img src="http://placehold.it/250x250" width="100%" className="img-responsive" />
      <p>{props.item.summary}</p>
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
        <Link to={ `/item/${props.item.id}` } className="btn btn-default btn-sm">Learn More</Link> 
        <CartButton handler={AppActions.addItem.bind(null, props.item)} txt="Add to cart" />
      </div>
    </div>
  );
};

export default CatalogItem;
