'use strict';
import { register } from './../dispatchers/app-dispatcher.js';
import AppConstants from './../constants/app-constants.js';
import { EventEmitter } from 'events';
import CartAPI from './../api/cart-api';

// We create a constant that will contain the name of the event
// we are going to broadcast when a change is emitted
//const CHANGE_EVENT = 'change'; // Moved to AppConstants.CHANGE_EVENT

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
    return CartAPI.cartItems;
  },

  /**
   * Returns a list of merged items between catalog and cartItems to know
   * what all the items from our catalog are, and which ones are in the cart
   */
  getCatalog() {
    return CartAPI.getCatalogItems();
  },

  /**
   * Returns an object containing total qty and total costs of items
   * in the cart
   */
  getCartTotals() {
    return CartAPI.cartTotals();
  },

  /**
   * Dispatcher function that modifies the item in the store based on the
   * given action.actionType and emits the change event at the end of the
   * process
   */
  dispatcherIndex: register((action) => {
    switch (action.actionType) {
      case AppConstants.ADD_ITEM:
        CartAPI.addItem(action.item);
        break;
      case AppConstants.REMOVE_ITEM:
        CartAPI.removeItem(action.item);
        break;
      case AppConstants.INCREASE_ITEM:
        CartAPI.increaseItem(action.item);
        break;
      case AppConstants.DECREASE_ITEM:
        CartAPI.decreaseItem(action.item);
        break;
    }

    // Finally we emit the change event to let our registered callbacks know
    // we have changed the data store
    AppStore.emitChange();
  })
});

export default AppStore;
