'use strict';
const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const Matter = require('matter-js');

//react components
const Universe = require('./universe/universe.js')
const TimeButton = require('./universe/timeControl.js');

//to test react front and rails back, have each service hosted on a different port, then run ajax requests to those ports as if through a 3rd party API

const Front = React.createClass ({

  getInitialState : function() {

    return {
      placeholder: ['string'],
      time: 'normal', //pick from: ['stopped','normal','fast','slow']
    }
  },
  componentDidMount : function () {

  },

  render : function () {

    return (

      <div id="frontContainer">
        test bullshit
        insert further components here


        <Universe />
        <TimeButton />






      </div>
    )
  }

});


  ReactDOM.render( <Front/> , document.querySelector('#container') );
