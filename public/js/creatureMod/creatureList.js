//wrapper component to be composed of singleCreature components
//changing purpose to be a display area for current list of creatures on screen.

//not going to do this today. maybe later.

// 'use strict'
const React = require('react');
const Matter = require('matter-js');

const SingleCreature = require('./singleCreature.js')


const CreatureList = React.createClass({

  getInitialState : function (){
    return{
      display: []
    }
  }

  ,handleClick : function (event) {
    console.log('handleClick called');
    event.preventDefault();
    this.displayCreatures();
    //if i had slowed and resumed, i need to hit pause twice to actually pause. resuming from slow seems to speed up the bodies.
  }

  ,displayCreatures : function () {

    // this.props.engine.world.bodies
    // for i starting at i=4, show relevant stats --> size, power, move, energy factor, currrent energy, max energy, genealogy, compatibility. maybe some engine stats such as mass, velocity?
    let bodiesArray = this.props.engine.world.bodies;
    let numberOfBodies = this.props.engine.world.bodies.length;
    let i=4;
    let display=[];
    for(i;i<numberOfBodies; i++) {
      // console.log(i,'was i in creatureList loop');
      // console.log(display, 'was display at start of loop');
      // console.log(bodiesArray,'was bodiesArray at start of loop');
      // console.log(bodiesArray[i], 'was bodiesArray[i] at start of loop');
      display.push ( {
        size : bodiesArray[i].size
        ,power : bodiesArray[i].power
        ,move : bodiesArray[i].move
        ,energyFactor : bodiesArray[i].energyFactor
        ,genealogy : bodiesArray[i].genealogy
        ,compatibleBreed : bodiesArray[i].compatibleBreed
      } )
      // console.log(bodiesArray,'was bodiesArray after push in loop ');
      // console.log(display, "was display in loop in creatureList.js");
      // console.log(this.props.engine.world.bodies[i], 'was this.props.engine.world.bodies[i]');
    }
    // console.log(i, 'was i after creatureList loop');
    console.log(display, 'was display after loop');
    // console.log(bodiesArray, 'was bodiesArray after loop');
  }


  ,render : function() {


    return (
      <div>
        <button onClick={this.handleClick}>
          {this.props.label}
        </button>
        creatureList goes here
        <ul>
          <li>

              <SingleCreature
                displayCreatures={this.displayCreatures}

                />

          }

          </li>

        </ul>

      </div>
    )
  }
})

module.exports = CreatureList;
