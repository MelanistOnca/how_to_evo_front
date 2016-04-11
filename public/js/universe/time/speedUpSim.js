//buttons to speed Up passage of time




'use strict'
const React = require('react');
const ReactDOM = require('react-dom');
const Matter = require('matter-js');
// const Runner = Matter.Runner;
const Engine = Matter.Engine;
// console.log('speedUpSim.js ran');

//components

//props passed in
// console.log(this.props,'was this.props');

const SpeedButton = React.createClass({

  handleClick : function (event) {
    console.log('handleClick called');
    event.preventDefault();
    this.speedUniverse();
  },

  speedUniverse : function() {
  //  // var ticks = Runner.create();
  //  // var startTicks = Runner.start(ticks,engine)
  //the above are what i have set up in my matterjs demo, change names for actual project?

  //with the above names, the below stops the physics
  //Runner.stop(ticks)
  console.log('speedUpUniverse called');
  // console.log(this.props.ticks,'was this.props.ticks');
    this.props.engine.timing.timeScale = .7; //0 stops time, greater than 1 speeds it up. //values much larger than 1.3 seem to knock current base objects out of universe.
    //i have code in restart sim that should set timeScale back to 1
    // console.log(this.props.engine.timing.timeScale, 'was timeScale');

  },

  render : function() {

    //will probably need to props-ize the onClick action so that i can call this component multiple times to get the various time effects (stop/speed/speed/start)
    return (
      <div>

        <button onClick={this.handleClick}> {this.props.label} </button>
      </div>

    )
  }
})

// ReactDOM.render( <TimeButton/> , document.querySelector('#container') ); //this works when i have it rendered by itself. not sure why including it in front.js seems to break everything.
module.exports = SpeedButton;
