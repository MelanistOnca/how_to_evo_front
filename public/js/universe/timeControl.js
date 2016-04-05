//buttons to pause/slow/speed passage of time
'use strict'
const React = require('react');
const ReactDOM = require('react-dom');
const Matter = require('matter-js');
const Runner = Matter.Runner;
console.log('timeControl.js ran');



const TimeButton = React.createClass({

  handleClick : function (event) {
    console.log('thingy');
    event.preventDefault();
    this.pauseUniverse();
  },

  pauseUniverse : function() {
  //  // var ticks = Runner.create();
  //  // var startTicks = Runner.start(ticks,engine)
  //the above are what i have set up in my matterjs demo, change names for actual project?

  //with the above names, the below stops the physics
  //Runner.stop(ticks)
  console.log('pauseUniverse called');
    // Runner.stop(ticks);
  },

  render : function() {

    //will probably need to props-ize the onClick action so that i can call this component multiple times to get the various time effects (stop/slow/speed/start)
    return (
      <div>

        <button onClick={this.handleClick}>Pause</button>
      </div>

    )
  }
})

// ReactDOM.render( <TimeButton/> , document.querySelector('#container') ); //this works when i have it rendered by itself. not sure why including it in front.js seems to break everything.
module.exports = TimeButton;
