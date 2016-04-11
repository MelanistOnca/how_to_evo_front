'use strict';
const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const Matter = require('matter-js');

//react components
const Universe = require('./universe/universe.js');



//to test react front and rails back, have each service hosted on a different port, then run ajax requests to those ports as if through a 3rd party API

const Front = React.createClass ({

  getInitialState : function() {

    return {
      placeholder: ['string']
      ,time: 'normal' //pick from: ['stopped','normal','fast','slow']
      ,runnerAlias : ''
    }
  },
  componentDidMount : function () {

  },

  render : function () {

    return (

      <div id="frontContainer">
        


        <Universe />







      </div>
    )
  }

});


  ReactDOM.render( <Front/> , document.querySelector('#container') );
