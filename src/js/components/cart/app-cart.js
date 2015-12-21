'use strict';
import React from 'react';
import AppStore from './../../stores/app-store';
import StoreWatchMixin from './../../mixins/store-watch-mixin';
import CartItem from './app-cart-item';
import { Link } from 'react-router';

/**
 * Gets this component's initial state
 */
function getCartItems(props) {
  // I don't really get it what's with the props obj passed by default
  // to the Higher Order Component constructor
  console.log("PROPS:", props);
  return { items: AppStore.getCart() };
}

// This class setup with constructor for state, _onChange registering and
// unregistering the listener on mount/unmount is going to be very repetitive
// We are going to need this exact setup on many components in our site.
// To resolve this we are going to create a higher order function in our
// mixins folder - store-watch-mixin.js - that we are going to use each time
// we need this setup
const Cart = (props) => {
  let total = 0;
  const items = props.items.map((item, index) => {
    let subtotal = item.cost * item.qty;
    total += subtotal;

    return <CartItem subtotal={subtotal} key={index} item={item} />;
  });

  return (
    <div>
      <h1>Cart</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
            <th>Qty.</th>
            <th></th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="text-right">Total</td>
            <td>${total}</td>
          </tr>
        </tfoot>
      </table>
      <br />
      <br />
      <p><Link to="/">Continue Shopping</Link></p>
    </div> 
  );
};

export default StoreWatchMixin(Cart, getCartItems);
