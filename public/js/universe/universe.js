//matterjs stuff here, likely have subfiles
const React = require('react');
const Matter = require('matter-js');
const $ = require('jquery')
console.log('universe.js ran');
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
const    Runner = Matter.Runner;


// Matter.Contact module seems to be what 'generates' collision-ability?
// {x:0,y:0} is top left corner of canvas, 1600 appears to be equivalent to 800px, since height is 600 px, i'm guessing it goes to 1200px
// Matter.js module aliases

// body.restitution Number
// A Number that defines the restitution (elasticity) of the body. The value is always positive and is in the range (0, 1). A value of 0 means collisions may be perfectly inelastic and no bouncing may occur.


//const's see what Matter.Contact.create(vertex) does
//vertex MIGHT be set of x,y coords supplied as {x: #, y: #}  ?
// const testContact = Contact.create({x:450,y:190});
//generates the following error message:
// matter.min.js:formatted:742Uncaught TypeError: Cannot read property 'id' of undefinedn.id @ matter.min.js:formatted:742n.create @ matter.min.js:formatted:734(anonymous function) @ matter_intro.js:22


//trying Detector for collisions
// Detector.canCollide(filterA, filterB)

// You can make the world bounds bigger when you create a world:
//
// Matter.World.create({
//     bounds: {
//         min: { x: 0, y: 0 },
//         max: { x: 800, y: 600 }
//     }
// });



//apply force at start


// engine.world.bodies[0].force.x=.5
//above shot the box out to the right, fairly fast
//engine.world.bodies[0].force.x=.05
//that pushed it to the right, but not off screen, friction properties of object ( engine.world.bodies[0] ) were
// friction:0.1
// frictionAir:0.01
// frictionStatic:0.5

//object size seems to have an effect. larger rectangle SEEMED to move more than the square when equal force was applied


//trying to log collisions

// console.log(Date());





const Universe = React.createClass ( {

  getInitialState : function (){
    return {
      // createTheUniverse: true;
    }
  },

  componentDidMount :  function (){
    const ticks = 'test';//is not recognized when i check console
  },

  matterJScode : function (){

    //define canvas for use in creating engine
    const    canvas = document.getElementById('canvas');

    {/* create a Matter.js engine */}
    const engine = Engine.create({
          render: {
          element: document.body
          ,canvas: canvas
          ,options: {
            width: 500,
            height: 500
          }

        }
    });


    const things = Composite.allBodies(engine.world);

    //attempt to modify gravity
    // engine.world.gravity.y= 0.001;
    // engine.world.gravity.x= 0.1;
    engine.world.gravity.y= 0;
    engine.world.gravity.x= 0;

    //

    //from collisionFiltering example at https://github.com/liabru/matter-js/blob/master/examples/collisionFiltering.js

    const defaultCategory = 0x0001,
    category2 = 0x0002;
    // shapeCategorty = 0x0002; //this isn't needed since i want everything to collide with everything
    const defaultProps = { //probably need to turn this into a function to pass in things like object label or anything else i may want to change.
    collisionFilter: {
    category: defaultCategory,
    mask: defaultCategory
    },
    restitution: 1,
    friction: 0,
    frictionAir: 0,
    inertia: Infinity
    }; //force is conserved until some object moves fast enough that it goes through the edge. maybe start with lower force and have creature energy used to generate additional force over time, thus allowing the use of friction

    const borderProps = {
    isStatic: true,
    collisionFilter: {
    category: defaultCategory,
    mask: defaultCategory
    }
    ,restitution: 0
    ,friction: 0
    ,frictionAir: 0
    };

    // create two boxes and a ground
    const boxA = Bodies.rectangle(370, 270, 40, 40,defaultProps );
    const trapezoidB = Bodies.trapezoid(450, 450, 60, 60, 5,  defaultProps);
    // const trapezoidB = Bodies.trapezoid(x, y, wid, hei, slo, defaultProps);
    const circleA = Bodies.circle(270, 150, 20, defaultProps);
    const polygonA = Bodies.polygon(350, 300, 6, 20, defaultProps);
    const rectangleA = Bodies.rectangle(100, 150, 80, 35, defaultProps);


    //borders
    const bottomBorder = Bodies.rectangle(250, 500, 510, 50, borderProps);
    const topBorder = Bodies.rectangle(0, 0, 1000, 50, borderProps);
    const leftBorder = Bodies.rectangle(0, 0, 50, 1000, borderProps );
    const rightBorder = Bodies.rectangle(500, 30, 50, 1000, borderProps );

    //borders
    World.add(engine.world, [bottomBorder, topBorder, leftBorder, rightBorder

     ]);

    // add all of the bodies to the world
    World.add(engine.world, [boxA, trapezoidB, circleA, polygonA, rectangleA /*testContact,*/ ]);

    //define initial forces
    const applyForce = (engine) => {
    Composite.allBodies(engine.world).forEach( (body) => {
    if(!body.isStatic){
    const forceMagnitude = 0.01  * body.mass;
    Body.applyForce(body, { x: 0, y: 0 }, {

      x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]),
      y: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1])
    })
    }
    });

    }

    //apply above definitions
    applyForce(engine);

    //log shit on collisions
    Events.on(engine, 'collisionStart', (event)=>{




    //  this block returns the name of the bodies involved in the collision
    console.log(engine.pairs.list[0].bodyA.label, 'was engine.pairs.list[0].bodyA.label');
    console.log(engine.pairs.list[0].bodyB.label, 'was engine.pairs.list[0].bodyB.label');
    //need to have if-statement to ignore collisions with sides for logging/event triggering
    //end of block

    /* other collision pairs. may return error if no collisions at that index
    // console.log(engine.pairs.list[1].bodyA.label, 'was engine.pairs.list[1].bodyA.label');
    // console.log(engine.pairs.list[2].bodyA.label, 'was engine.pairs.list[2].bodyA.label');
    // console.log(engine.pairs.list[3].bodyA.label, 'was engine.pairs.list[3].bodyA.label');
    */

    })

    const ticks = Runner.create(); //names runner so i can control later

    // run the engine
    // Engine.run(engine);
    // Runner.run(engine);
    Runner.start(ticks,engine); //this usage allows me to start/stop


    // const startTicks = Runner.start(ticks,engine) //this doesn't do what i want to

    //Runner.start(ticks,engine) // in the console restarts motion

    //Runner.stop(ticks) stops the physics

  },

  render : function() {
    //tell engine to render in universeContainer
    return (

      <div id="universeContainer">
        <button onClick={this.matterJSCode}>Start the sim</button>
        <ul>
        canvas below to see if it gets overwritten
        <canvas></canvas>
        canvas with id 'canvas' below
        <canvas id="canvas"></canvas>
        </ul>

      </div>
    )
  }

})



module.exports = Universe;
