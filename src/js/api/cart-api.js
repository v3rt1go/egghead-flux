'use strict';

const CartAPI = {
  catalog: [],
  cartItems: [],

  init() {
    // Inside our api we could also seed our catalog with dummy data 
    // for testing
    for (let i = 1; i < 9; i++) {
      // It helps to push the items inside the catalog in valid JSON since
      // this is what we'll be used to send data across the app
      this.catalog.push({
        'id': 'Widget ' + i,
        'title': 'Widget #' + i,
        'summary': 'A great widget for any widget lover',
        'descipription': 'Lorem ispum dolor sit amet consectuar para bimbum bum bum',
        'cost': i
      });
    }
  },

  /** 
   * Removes an item form the cart, if exists, indifferent of its qty
   */
  removeItem(item) {
    this.cartItems.splice(this.cartItems.findIndex(i => i === item), 1);
  },

  /**
   * Finds and returns an item from the cart, if exists, based on the item.id
   */
  findCartItem(item) {
    return this.cartItems.find(i => i.id === item.id);
  },

  /**
   * Increases an item's qty by 1
   */
  increaseItem(item) {
    item.qty++;
  },

  /**
   * Decreases an item's qty by 1. If resulting qty is 0 removes the
   * item from the cart
   */
  decreaseItem(item) {
    item.qty--;
    if (item.qty === 0) {
      this.removeItem(item);
    }
  },

  /**
   * Adds an item in the cart. If adding for first time - will assign a qty prop of 1
   * If item already existed it _increaseItem qty by 1
   */
  addItem(item) {
    const cartItem = this.findCartItem(item);
    // First time adding item in cart
    if (!cartItem) {
      // Put the item in the cart catalog and assign a qty prop of 1 to it
      // Object.assign is a ES6 method that will copy ...sources - 2nd param (item in our case)
      // all keys and join them with the target obj ({qty: 1}). Returns resulted target
      this.cartItems.push(Object.assign({qty: 1}, item));
    } else {
      // Item already in cart, increase it's qty
      this.increaseItem(cartItem);
    }
  },

  /**
   * Returns a list of merged items between catalog and cartItems to know
   * what all the items from our catalog are, and which ones are in the cart
   */
  getCatalogItems() {
    return this.catalog.map((item) => {
      return Object.assign({}, item, this.findCartItem(item));
    });
  },

  /**
   * Calculates the total cost amount of the items in the cart and and total
   * number of items.
   * Returns an object with qty and total as keys
   */
  cartTotals(qty = 0, total = 0) {
    this.cartItems.forEach((item) => {
      qty += item.qty;
      total += (item.cost * item.qty);
    });

    return {qty, total};
  }
};

// We call our init method before exporting to seed our memory store with some test data
CartAPI.init();
export default CartAPI;
