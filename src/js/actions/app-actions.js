'use strict';
import AppConstants from './../constants/app-constants.js';
import { dispatch } from './../dispatchers/app-dispatcher.js';

const AppActions = {

  addItem(item) {
    dispatch({actionType: AppConstants.ADD_ITEM, item});
  },
  removeItem(item) {
    dispatch({actionType: AppConstants.REMOVE_ITEM, item});
  },
  increaseItem(item) {
    dispatch({actionType: AppConstants.INCREASE_ITEM, item});
  },
  decreaseItem(item) {
    dispatch({actionType: AppConstants.DECREASE_ITEM, item});
  }
};

export default AppActions;
