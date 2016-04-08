//buttons to restar passage of time
'use strict'
const React = require('react');
const ReactDOM = require('react-dom');
const Matter = require('matter-js');
const Runner = Matter.Runner;
// console.log('restartSim.js ran');

//components

//props passed in
// console.log(this.props,'was this.props');

const RestartButton = React.createClass({

  handleClick : function (event) {
    console.log('handleClick called');
    event.preventDefault();
    this.restartUniverse();
  },

  restartUniverse : function() {
  //  // var ticks = Runner.create();
  //  // var startTicks = Runner.start(ticks,engine)
  //the above are what i have set up in my matterjs demo, change names for actual project?

  //with the above names, the below stops the physics
  //Runner.stop(ticks)
  console.log('restartUniverse called');
  console.log(this.props.ticks,'was this.props.ticks');
    Runner.start(this.props.ticks, this.props.engine);
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
module.exports = RestartButton;
