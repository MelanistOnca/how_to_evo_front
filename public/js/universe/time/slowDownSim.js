//buttons to slow down passage of time
//
// engine.timingObject
// An Object containing properties regarding the timing systems of the engine.
// @ src\core\Engine.js:426
// engine.timing.timeScaleNumber
// A Number that specifies the global scaling factor of time for all bodies. A value of 0 freezes the simulation. A value of 0.1 gives a slow-motion effect. A value of 1.2 gives a speed-up effect.
// Default: 1
// @ src\core\Engine.js:433
// engine.timing.timestampNumber
// A Number that specifies the current simulation-time in milliseconds starting from 0. It is incremented on every Engine.update by the given delta argument.
// Default: 0
// @ src\core\Engine.js:444



'use strict'
const React = require('react');
const ReactDOM = require('react-dom');
const Matter = require('matter-js');
// const Runner = Matter.Runner;
const Engine = Matter.Engine;
// console.log('slowDownSim.js ran');

//components

//props passed in
// console.log(this.props,'was this.props');

const SlowButton = React.createClass({

  handleClick : function (event) {
    console.log('handleClick called');
    event.preventDefault();
    this.slowUniverse();
    //if i had slowed and resumed, i need to hit pause twice to actually pause. resuming from slow seems to speed up the bodies.
  },

  slowUniverse : function() {
  //  // var ticks = Runner.create();
  //  // var startTicks = Runner.start(ticks,engine)
  //the above are what i have set up in my matterjs demo, change names for actual project?

  //with the above names, the below stops the physics
  //Runner.stop(ticks)
  console.log('slowDownUniverse called');
  // console.log(this.props.ticks,'was this.props.ticks');
    this.props.engine.timing.timeScale = 0.2; //0 stops time, greater than 1 speeds it up
    //i have code in restart sim that should set timeScale back to 1
    // console.log(this.props.engine.timing.timeScale, 'was timeScale');
  },

  render : function() {

    //will probably need to props-ize the onClick action so that i can call this component multiple times to get the various time effects (stop/slow/speed/start)
    return (
      <div>

        <button onClick={this.handleClick}> {this.props.label} </button>
      </div>

    )
  }
})

// ReactDOM.render( <TimeButton/> , document.querySelector('#container') ); //this works when i have it rendered by itself. not sure why including it in front.js seems to break everything.
module.exports = SlowButton;
