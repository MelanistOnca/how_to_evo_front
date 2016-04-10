//redo this, make a separate compeonent that holds all the nasty needed to get the physics engine to show/run?
const React = require('react');
const $ = require('jquery');


const Matter = require('matter-js');
const Engine = Matter.Engine;
const    Bodies = Matter.Bodies;
const    World = Matter.World;
const    Events = Matter.Events;
const    Runner = Matter.Runner;

const checkMarryKill = require('./../creatureMod/checkMarryKill.js');

const canvas = document.getElementById('canvas')

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


engine.world.gravity.y= 0;
engine.world.gravity.x= 0;

const defaultCategory = 0x0001;

const defaultProps = {
        restitution: 1
        ,friction: 0
        ,frictionAir: 0
        ,inertia: Infinity
      };

const borderProps = {
        isStatic: true
        ,restitution: 0
        ,friction: 0
        ,frictionAir: 0
      };

      //borders
const bottomBorder = Bodies.rectangle(250, 500, 510, 50, borderProps);
const topBorder = Bodies.rectangle(0, 0, 1000, 50, borderProps);
const leftBorder = Bodies.rectangle(0, 0, 50, 1000, borderProps );
const rightBorder = Bodies.rectangle(500, 30, 50, 1000, borderProps );

World.add(engine.world, [
                          bottomBorder
                          ,topBorder
                          ,leftBorder
                          ,rightBorder
                        ]);

//log shit on collisions
Events.on(engine, 'collisionStart', checkMarryKill)


const ticks = Runner.create(); //names runner so i can control later

console.log(ticks,'was ticks in engineRender.js');


Runner.start(ticks,engine);

const EngineRender = React.createClass({




  render : function () {


    return(
      <div>
        shitty placeholder in engineRender
      </div>

    )
  }

})



module.export = EngineRender;
