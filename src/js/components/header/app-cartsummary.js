'use strict';
import React from 'react';
import { Link } from 'react-router';
import AppStore from './../../stores/app-store';
import StoreWatchMixin from './../../mixins/store-watch-mixin';

const CartSummary = ( props ) => {
  return (
    <div style={{paddingTop: 15}}>
      <Link to="/cart" className="btn btn-success">
        { `Cart Items: ${props.qty} / $${props.total}` }
      </Link>
    </div>
  );
};

// We mixin in the CartSummary stateless component with the StoreWatch mixin
// to make this component listen to changes from the app store. We then pass
// the AppStore.getCartTotals function as the state callback that will set 
// the initial state of the resulted mixed component and will be injected as
// props in the stateless component > Link component
export default StoreWatchMixin(CartSummary, AppStore.getCartTotals);

