'use strict';
import React from 'react';

/**
 * A stateless react component that represents a add to cart 
 * button to be displayed inside the catalog item
 */
const CartButton = (props) => {
  return (
    <button className="btn btn-default btn-sm" onClick={props.handler}>
      {props.txt} 
    </button>
  );
};

export default CartButton;
