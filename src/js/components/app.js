'use strict';
import React from 'react';
import AppActions from './../actions/app-actions.js';


// TODO: DISABLE TERN_FOR_VIM - MAKES VIM TO SLOW

class App extends React.Component {
  render() {
    return (
      <h1 onClick={AppActions.addItem.bind(null, 'this is the item ...')}>
        A super cool Flux App
      </h1>

    );
  }
}

export default App;
