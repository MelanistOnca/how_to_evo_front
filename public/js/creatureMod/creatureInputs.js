const Matter = require('matter-js');


const World = Matter.World;
const Bodies = Matter.Bodies;

const malleableDefaults = require('./malleableDefaults.js');


const creatureInputs = function (genealogy ,compatibleBreed ,size ,power ,move ,energyF ,mutate = 2) {
  console.log(genealogy ,compatibleBreed ,size ,power ,move ,energyF ,mutate , 'was genealogy ,compatibleBreed ,size ,power ,move ,energyF ,mutate in creatureInputs() of universe.js');
  //do i even need to variablize this? can i just do World.add(engine.world, [Bodies.circle(/*passed inputs*/)
  //100-400 range guarantees inside canvas
  // console.log(this.props,"was this.props in creature inputs");
  const rangeMin = 100;
  const rangeMax = 400;
  const x_coord = Math.floor(Math.random()*(rangeMax-rangeMin+1)) + rangeMin;
  const y_coord = Math.floor(Math.random()*(rangeMax-rangeMin+1)) + rangeMin; //not DRY, but want different ones each time. functionalize?
  //limit creature sizes between 10 and 50 :
  //( 5+( (15*size^1.001)/(size^1.001) ) )
  // const scaledSize = 10+( (40*size^1.001)/(size^1.001) );
  //the above formula was not behaving as expected. trying the following instead: y= 10+(10x^1.3)/(x) where 0<x<10
  const scaledSize = 10+( 10*Math.pow(size, 1.3 ) ) /(size) ;
  console.log('just before Bodies.circle() called in creatureInputs');
  const newbie = Bodies.circle(x_coord,y_coord, scaledSize, malleableDefaults(genealogy ,compatibleBreed ,size ,power ,move ,energyF ,mutate));
  // console.log(this.props.engine.world,'was this.props.engine.world in creatureInputs');
  //
  // World.add(this.props.engine.world,[newbie])
  console.log(engine.world,'was this.props.engine.world in creatureInputs');
  //will probably be undefined. trying to access engine from universe.js

  World.add(engine.world,[newbie])

}

module.exports = creatureInputs;
