//button to apply force to creature made through create creature tool

'use strict'
const React = require('react');
const ReactDOM = require('react-dom');
const Matter = require('matter-js');

//matter-js reqs
const Composite = Matter.Composite;
const Body = Matter.Body;
const Common = Matter.Common;




const ApplyForceButton = React.createClass ({

  handleClick : function (event) {
    console.log('handleClick called');
    event.preventDefault();
    this.applyForce(this.props.engine);
  },

  applyForce : function(engine) {
    Composite.allBodies(engine.world).forEach( (body) => {
    if(!body.isStatic){
    const forceMagnitude = 0.01  * body.mass;
    Body.applyForce(body, { x: 0, y: 0 }, {

      x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]),
      y: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1])
    })
    }
    });
  },

  render : function () {

    return (
      <div>

        <button onClick={this.handleClick}> {this.props.label} </button>
      </div>
    )
  }

})

module.exports = ApplyForceButton;
