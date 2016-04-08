//button to pause passage of time
'use strict'
const React = require('react');
const ReactDOM = require('react-dom');
const Matter = require('matter-js');
const Runner = Matter.Runner;
// console.log('pauseSim.js ran');

//components

//props passed in
// console.log(this.props,'was this.props');

const PauseButton = React.createClass({

  handleClick : function (event) {
    console.log('handleClick called');
    event.preventDefault();
    this.pauseUniverse();
    //if i had slowed and resumed, i need to hit pause twice to actually pause. resuming from slow seems to speed up the bodies.
  },

  pauseUniverse : function() {
  //  // var ticks = Runner.create();
  //  // var startTicks = Runner.start(ticks,engine)
  //the above are what i have set up in my matterjs demo, change names for actual project?

  //with the above names, the below stops the physics
  //Runner.stop(ticks)
  console.log('pauseUniverse called');
  // console.log(this.props.ticks,'was this.props.ticks');
    Runner.stop(this.props.ticks);
    this.props.engine.timing.timeScale = 1;
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
module.exports = PauseButton;
