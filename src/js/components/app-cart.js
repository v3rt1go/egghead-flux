'use strict';
import React from 'react';
import AppStore from './../stores/app-store';
import CartItem from './app-cart-item';

/**
 * Gets this component's initial state
 */
function getCartItems() {
  return { items: AppStore.getCart() };
}

class Cart extends React.Component {
  constructor() {
    super();
    this.state = getCartItems();
    // This component needs to be aware of changes that occurr in the
    // store so we need an _onChange handler
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    // We need to register this component with the changeListener to have
    // it aware of changes in the store. We will do this in this method
    // to have the component registered before it's mounted
    // We pass as callback the this._onChange handler
    AppStore.addChangeListener(this._onChange);
  }

  /**
   * This will be called each time a change event is emitted in our store.
   * It will draw again the cartItems collection and set it in the state
   */
  _onChange() {
    this.setState(getCartItems());
  }

  render() {
    let total = 0;
    const items = this.state.items.map((item, index) => {
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
      </div> 
    );
  }

  componentWillUnmount() {
    // We need to remove the listener when the component unmounts, so we don't
    // end up with hanging listeners and errors in our app
    AppStore.removeChangeListener(this._onChange);
  }
}

export default Cart;
