'use strict';
import { register } from './../dispatchers/app-dispatcher.js';
import AppConstants from './../constants/app-constants.js';
import { EventEmitter } from 'events';

// We create a constant that will contain the name of the event
// we are going to broadcast when a change is emitted
//const CHANGE_EVENT = 'change'; // Moved to AppConstants.CHANGE_EVENT

// This is a private variable that is only accessible from the store
// and it holds the app store items catalog
let _catalog = [];

// Inside our store we could also seed our catalog with dummy data 
// for testing
for (let i = 1; i < 9; i++) {
  // It helps to push the items inside the catalog in valid JSON since
  // this is what we'll be used to send data across the app
  _catalog.push({
    'id': 'Widget ' + i,
    'title': 'Widget #' + i,
    'summary': 'A great widget for any widget lover',
    'descipription': 'Lorem ispum dolor sit amet consectuar para bimbum bum bum',
    'cost': i
  });
}

// This will represent the items the user has in the cart
let _cartItems = [];

// Defining our cart actions. All the actions below are private to this store
// Marked by the preceding _ in the var name

/** 
 * Removes an item form the cart, if exists, indifferent of its qty
 */
const _removeItem = (item) => _cartItems.splice(_cartItems.findIndex(i => i === item), 1);
/**
 * Finds and returns an item from the cart, if exists, based on the item.id
 */
const _findCartItem = (item) => _cartItems.find(i => i.id === item.id);
/**
 * Increases an item's qty by 1
 */
const _increaseItem = (item) => item.qty++;
/**
 * Decreases an item's qty by 1. If resulting qty is 0 removes the
 * item from the cart
 */
const _decreaseItem = (item) => {
  item.qty--;
  if (item.qty === 0) {
    _removeItem(item);
  }
};
/**
 * Adds an item in the cart. If adding for first time - will assign a qty prop of 1
 * If item already existed it _increaseItem qty by 1
 */
const _addItem = (item) => {
  const cartItem = _findCartItem(item);
  // First time adding item in cart
  if (!cartItem) {
    // Put the item in the cart catalog and assign a qty prop of 1 to it
    // Object.assign is a ES6 method that will copy ...sources - 2nd param (item in our case)
    // all keys and join them with the target obj ({qty: 1}). Returns resulted target
    _cartItems.push(Object.assign({qty: 1}, item));
  } else {
    // Item already in cart, increase it's qty
    _increaseItem(cartItem);
  }
};
/**
 * Calculates the total cost amount of the items in the cart and and total
 * number of items.
 * Returns an object with qty and total as keys
 */
const _cartTotals = (qty = 0, total = 0) => {
  _cartItems.forEach((item) => {
    qty += item.qty;
    total += (item.cost * item.qty);
  });

  return {qty, total};
};

// Defining the AppStore
// We will use Object.assign to merge the EventEmitter.prototype with our AppStore so
// we can use it to emit and listen for events
const AppStore = Object.assign(EventEmitter.prototype, {
  /**
   * Emits the change event as defined in AppConstants.CHANGE_EVENT
   */
  emitChange() {
    this.emit(AppConstants.CHANGE_EVENT);
  },

  /** 
   * Registers the callback as an event listener to be called when the event
   * is emitted
   */
  addChangeListener(callback) {
    this.on(AppConstants.CHANGE_EVENT, callback);
  },

  /** 
   * Removes the callback as an event listener from the AppStore 
   */
  removeChangeListener(callback) {
    this.removeListener(AppConstants.CHANGE_EVENT, callback);
  },

  /**
   * Returns a list of _cartItems
   */
  getCart() {
    return _cartItems;
  },

  /**
   * Returns a list of merged items between catalog and cartItems to know
   * what all the items from our catalog are, and which ones are in the cart
   */
  getCatalog() {
    return _catalog.map((item) => {
      return Object.assign({}, item, _findCartItem(item));
    });
  },

  /**
   * Returns an object containing total qty and total costs of items
   * in the cart
   */
  getCartTotals() {
    return _cartTotals();
  },

  /**
   * Dispatcher function that modifies the item in the store based on the
   * given action.actionType and emits the change event at the end of the
   * process
   */
  dispatcherIndex: register((action) => {
    switch (action.actionType) {
      case AppConstants.ADD_ITEM:
        _addItem(action.item);
        break;
      case AppConstants.REMOVE_ITEM:
        _removeItem(action.item);
        break;
      case AppConstants.INCREASE_ITEM:
        _increaseItem(action.item);
        break;
      case AppConstants.DECREASE_ITEM:
        _decreaseItem(action.item);
        break;
    }

    // Finally we emit the change event to let our registered callbacks know
    // we have changed the data store
    AppStore.emitChange();
  })
});

export default AppStore;
