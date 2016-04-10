//matterjs stuff here, likely have subfiles
const React = require('react');
const Matter = require('matter-js');
const $ = require('jquery');

///add engine and shit to state?

// console.log('universe.js ran');

//matter-js reqs
const    Engine = Matter.Engine;
const    World = Matter.World;
const    Bodies = Matter.Bodies;
const    Contact = Matter.Contact;
const    Detector = Matter.Detector;
const    Composite = Matter.Composite;
const    Body = Matter.Body;
const    Common = Matter.Common;
const    Events = Matter.Events;
const    Pair = Matter.Pair;
const    Render = Matter.Render;
//check render docs to see if you can insert the canvas to a specific element
// http://brm.io/matter-js/docs/classes/Render.html#property_element
const    Runner = Matter.Runner;

//components
const CreatureGenerator = require('./../creatureMod/creatureGenerator.js');
const ApplyForceButton = require('./applyForce.js')
const PauseButton = require('./time/pauseSim.js');
const RestartButton = require('./time/restartSim.js');
const SlowButton = require('./time/slowDownSim.js');
const SpeedButton = require('./time/speedUpSim.js');


//vars that the js files use


//req'd js files
const checkBreedable = require('./../creatureMod/checkBreedable.js');
const checkMarryKill = require('./../creatureMod/checkMarryKill.js');
const breed = require('./../creatureMod/breed.js');
const fight = require('./../creatureMod/fight.js');
const malleableDefaults = require('./../creatureMod/malleableDefaults.js');
const creatureInputs = require('./../creatureMod/creatureInputs.js');

// const engine = require('./engine.js')

//trying to put universe starting props in a js file so that i can reference it in other js files when needed
// const universeProperties = require('./universeProperties.js');
const EngineRender = require('./engineRender.js')

//need to do the above to all the major functions, breed, fight, etc that are hanging out at this level ******************************************************************************************************************************************************************************************************************

/* create a Matter.js engine */


//define canvas for use in creating engine
const canvas = document.getElementById('canvas');
const engine = Engine.create({
            render: {
            element: document.body
            ,canvas: canvas
            ,options: {
              width: 500,
              height: 500,
              wireframes: false
            }

          }
        });
console.log(engine, 'engine outside of component');
const ticks = Runner.create(); //names runner so i can control later

console.log(ticks,'was ticks in universe.js');


Runner.start(ticks,engine);


const Universe = React.createClass ( {

  getInitialState : function (){
    return {
      // createTheUniverse: true;
    }
  }

  ,componentDidMount :  function (){
    // const ticks = 'test';//is not recognized when i check console
  }


  ,checkBreedable
  ,checkMarryKill
  ,breed
  ,fight
  ,malleableDefaults
  ,creatureInputs
  // ,universeProperties



  ,render : function() {
    // debugger;
    // universeProperties()
    // console.log( 'engine inside render, but before return', engine);
      return (
        <div className="universeWrapper">

          <CreatureGenerator
            engine={engine}
            creatureInputs={this.creatureInputs}

            />
          <ApplyForceButton
            engine={engine}
            label={'Get this show moving!'}
            />
          <PauseButton
            ticks={ticks}
            engine={engine}
            label={'Pause'}
            />
          <RestartButton
            ticks={ticks}
            engine={engine}
            label={'Resume at Normal Speed'}
            />
          <SlowButton

            engine={engine}
            label={'Slow'}
            />
          <SpeedButton

            engine={engine}
            label={'FASTER'}
            />


        </div>
      )

  }

})



module.exports = Universe;
