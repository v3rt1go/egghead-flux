'use strict';
// When creating our own react applications it is important to have
// our own app dispatcher distinct from the flux dispatcher so we 
// can inject in it any logic we might need
import { Dispatcher } from 'flux';

/**
 * Main application dispatcher
 */
const appDispatcher = new Dispatcher();

/**
 * Registers a callback on our Application Dispatcher
 */
function register(callback) {
  return appDispatcher.register(callback);
}
/**
 * Dispatches an action and actionType to all registered callbacks
 * from our Application Dispatcher
 */
function dispatch(actionType, action) {
  console.log("DISPATCHING:", actionType);
  appDispatcher.dispatch(actionType, action);
}

export { register, dispatch };
