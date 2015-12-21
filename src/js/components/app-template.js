'use strict';
import React from 'react';
import Header from './header/app-header';

const Template = (props) => {
  return (
    <div className="container">
      <Header />
      {/* 
        After renderdin the container and the Header we render
        the nested 'innerHtml' components - defined via react-router
        based on the current route. We can access the component to be
        rendered using this.props.children to load any nested html and
        components of the Template component. We are using this with 
        react-router and based on the url route only one child component
        will be rendered
      */}
      {props.children}
    </div>
  );
};

export default Template;
