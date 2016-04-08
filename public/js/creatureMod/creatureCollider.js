//probably will port this over to universe.js? not sure if/how to implment "if collision, run THISFILE"

//if i make it a component, this.props.engine wil be engine as passed from universe.

const React = require('react');
const Matter = require('matter-js');
const $ = require('jquery');

//matter-js reqs, may have more than i need
const    Events = Matter.Events;
// const    Pair = Matter.Pair;
// const    Composite = Matter.Composite;
// const    Contact = Matter.Contact;
// const    Detector = Matter.Detector;
// const    Common = Matter.Common;

//play around with 'collisonEnds' and the "collision during" term, which i need to look up
Events.on(engine, 'collisionStart', (event) => {

  engine.pairs.list.forEach( (el) => {

    // checkBreedable(el.bodyA, el.bodyB) //may need to implement a check for either body being "isStatic"(is a wall) and to skip further checks if one of the bodies "isStatic"
    if(checkBreedable(el.bodyA,el.bodyB)){
      breed(el.bodyA,el.bodyB)//this function doesn't exist yet.
    }
    else {
      fight(el.bodyA,el.bodyB)//this function also doesn't exist yet.
    }
  })

})
