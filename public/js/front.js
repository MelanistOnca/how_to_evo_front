'use strict';
const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');

//to test react front and rails back, have each service hosted on a different port, then run ajax requests to those ports as if through a 3rd party API

const App = React.createClass ({

  getInitialState : function() {
    return {
      placeholder: ['string']
    }
  },
  componentDidMount : function () {
    console.log('test');
  },

  render : function () {
    return (
      <div>
        test'bullshit
        insert further components here
      </div>
    )
  }

  })


  ReactDOM.render((

      <App/>


  ), document.querySelector('#container'));
