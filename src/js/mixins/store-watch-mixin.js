'use strict';
import React from 'react';
import AppStore from './../stores/app-store';

// InnerComponent is the component that we'll pass in the mixin
// stateCallback is the function that we're using to get the component's
// initial state
const StoreWatchMixin = (InnerComponent, stateCallback) => {
  return class extends React.Component {
    // We pass in the props that our parent component might have
    constructor(props) {
      super(props);
      // We're passing props into our initial callback because it'a a good practice
      // and it's a good way to reuse any props that might exist in order to determine
      // a components initial state
      this.state = stateCallback(props);
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
      // When we passed props to the constructor this.props was autoamtically
      // created and we can access them - with this.props - outside the constructor
      this.setState(stateCallback(this.props));
    }

    componentWillUnmount() {
      // We need to remove the listener when the component unmounts, so we don't
      // end up with hanging listeners and errors in our app
      AppStore.removeChangeListener(this._onChange);
    }

    render() {
      // We return the InnerComponent passing this.state and any this.props that were
      // passed in the constructor as props of the InnerComponent
      return (
        <InnerComponent {...this.state} {...this.props} />
      );
    }
  };
};

export default StoreWatchMixin;
