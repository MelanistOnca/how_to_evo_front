//matterjs stuff here, likely have subfiles
const React = require('react');
const Matter = require('matter-js');
const $ = require('jquery');

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


const Universe = React.createClass ( {

  getInitialState : function (){
    return {
      // createTheUniverse: true;
    }
  },

  componentDidMount :  function (){
    // const ticks = 'test';//is not recognized when i check console
  },



  render : function() {
    //tell engine to render in universeContainer
    // return (
    //
    //   <div id="universeContainer">
    //     <button onClick={this.matterJSCode}>Start the sim</button>
    //     <ul>
    //     canvas below to see if it gets overwritten
    //     <canvas></canvas>
    //     canvas with id 'canvas' below
    //     <canvas id="canvas"></canvas>
    //     </ul>
    //
    //   </div>
    // )


    //define canvas for use in creating engine
    const    canvas = document.getElementById('canvas');

    /* create a Matter.js engine */
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

    // const things = Composite.allBodies(engine.world);


    //set y and x gravities to zero
    engine.world.gravity.y= 0;
    engine.world.gravity.x= 0;

    //from collisionFiltering example at https://github.com/liabru/matter-js/blob/master/examples/collisionFiltering.js

    const defaultCategory = 0x0001,
    category2 = 0x0002;
    // shapeCategorty = 0x0002; //this isn't needed since i want everything to collide with everything
    const defaultProps = { //probably need to turn this into a function to pass in things like object label or anything else i may want to change.
    /*collisionFilter: {
    category: defaultCategory,
    mask: defaultCategory
    },*/
    restitution: 1,
    friction: 0,
    frictionAir: 0,
    inertia: Infinity
    // ,render:
    //   fillStyle: "#FFFFFF"
    }; //force is conserved until some object moves fast enough that it goes through the edge. maybe start with lower force and have creature energy used to generate additional force over time, thus allowing the use of friction
    // ********** com back here
    function malleableDefaults(restit, fric, airFric, inert, genString) {
      var temp = {
      restitution: restit,
      friction: fric,
      frictionAir: airFric
      ,inertia: inert
      ,render: {
        // fillStyle: "#8C8081"
        strokeStyle: "#8C8081"
        ,lineWidth: 1
        ,opacity: 1
        }
      }
      return temp;
    }

    // ********** return to above function

    const borderProps = {
    isStatic: true
    /*,collisionFilter: {
    category: defaultCategory,
    mask: defaultCategory
    }*/
    ,restitution: 0
    ,friction: 0
    ,frictionAir: 0
    };

    //non-static bodies
    // const boxA = Bodies.rectangle(370, 270, 40, 40,malleableDefaults(1,0,0,Infinity,'boxA name') );
    // console.log(boxA,'was boxA');
    // console.log(Matter.Bodies, 'was Matter.Bodies'); //this returned functions to make new bodies
    // console.log(Matter.Body, 'was Matter.Body');//returned functions to affect bodies
    // const trapezoidB = Bodies.trapezoid(450, 450, 60, 60, 5,  defaultProps);
    // // const trapezoidB = Bodies.trapezoid(x, y, wid, hei, slo, defaultProps);
    // const circleA = Bodies.circle(270, 150, 20, defaultProps);
    // const polygonA = Bodies.polygon(350, 300, 6, 20, defaultProps);
    // const rectangleA = Bodies.rectangle(100, 150, 80, 35, defaultProps);


    //borders
    const bottomBorder = Bodies.rectangle(250, 500, 510, 50, borderProps);
    const topBorder = Bodies.rectangle(0, 0, 1000, 50, borderProps);
    const leftBorder = Bodies.rectangle(0, 0, 50, 1000, borderProps );
    const rightBorder = Bodies.rectangle(500, 30, 50, 1000, borderProps );

    //define initial forces
    // const applyForce = (engine) => {
    // Composite.allBodies(engine.world).forEach( (body) => {
    // if(!body.isStatic){
    // const forceMagnitude = 0.01  * body.mass;
    // Body.applyForce(body, { x: 0, y: 0 }, {
    //
    //   x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]),
    //   y: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1])
    // })
    // }
    // });
    //
    // }

    //borders
    World.add(engine.world, [bottomBorder, topBorder, leftBorder, rightBorder

     ]);





    //log shit on collisions
    Events.on(engine, 'collisionStart', (event)=>{

    //this is where i will put the checkBreedable() call. play arround with the "collision___" string to see if Start/Active/End makes 'better' behavior

    })

    const ticks = Runner.create(); //names runner so i can control later

    console.log(ticks,'was ticks');

    // this.setState({
    //   runnerAlias: Runner.create()
    // })

    //apply above definitions
    // applyForce(engine);
    // console.log('remember to turn applyForce back on!!');
    // run the engine
    // Engine.run(engine);
    // Runner.run(engine);
    Runner.start(ticks,engine); //this usage allows me to start/stop
    // Runner.start(this.state.runnerAlias,engine); //this usage allows me to start/stop

    // const startTicks = Runner.start(ticks,engine) //this doesn't do what i want to

    //Runner.start(ticks,engine) // in the console restarts motion

    //Runner.stop(ticks) stops the physics
    /*end of big code block on render*/

      return (
        <div className="universeWrapper">

          <CreatureGenerator
            engine={engine}
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
          put an applyForce button?

        </div>
      )

  }

})



module.exports = Universe;
