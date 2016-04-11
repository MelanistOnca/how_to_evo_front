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
const CreatureList =  require('./../creatureMod/creatureList.js')
const ApplyForceButton = require('./applyForce.js')
const PauseButton = require('./time/pauseSim.js');
const RestartButton = require('./time/restartSim.js');
const SlowButton = require('./time/slowDownSim.js');
const SpeedButton = require('./time/speedUpSim.js');


//vars that the js files use

const checkBreedable = require('./../creatureMod/checkBreedable.js');
// const checkMarryKill = require('./../creatureMod/checkMarryKill.js');
// const breed = require('./../creatureMod/breed.js');
// const fight = require('./../creatureMod/fight.js');
const malleableDefaults = require('./../creatureMod/malleableDefaults.js');
// const creatureInputs = require('./../creatureMod/creatureInputs.js');


// const engine = require('./engineObject.js')

//necessary shit i want to export to different files , but starts here
//////
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


//fucking hell man, so ugly.
const creatureInputs = function (genealogy ,compatibleBreed ,size ,power ,move ,energyF ,mutate = 2) {
  // console.log(genealogy ,compatibleBreed ,size ,power ,move ,energyF ,mutate , 'was genealogy ,compatibleBreed ,size ,power ,move ,energyF ,mutate in creatureInputs() of universe.js');
  //do i even need to variablize this? can i just do World.add(engine.world, [Bodies.circle(/*passed inputs*/)
  //100-400 range guarantees inside canvas
  // console.log(this.props,"was this.props in creature inputs");
  const rangeMin = 50;
  const rangeMax = 450;
  const x_coord = Math.floor(Math.random()*(rangeMax-rangeMin+1)) + rangeMin;
  const y_coord = Math.floor(Math.random()*(rangeMax-rangeMin+1)) + rangeMin; //not DRY, but want different ones each time. functionalize?
  //limit creature sizes between 10 and 50 :
  //( 5+( (15*size^1.001)/(size^1.001) ) )
  // const scaledSize = 10+( (40*size^1.001)/(size^1.001) );
  //the above formula was not behaving as expected. trying the following instead: y= 10+(10x^1.3)/(x) where 0<x<10
  const scaledSize = 10+( 10*Math.pow(size, 1.3 ) ) /(size) ;
  // console.log('just before Bodies.circle() called in creatureInputs in universe.js');
  const newbie = Bodies.circle(x_coord,y_coord, scaledSize, malleableDefaults(genealogy ,compatibleBreed ,size ,power ,move ,energyF ,mutate));
  // console.log(this.props.engine.world,'was this.props.engine.world in creatureInputs');
  //
  // World.add(this.props.engine.world,[newbie])
  // console.log(engine.world,'was this.props.engine.world in creatureInputs in universe.js');
  //will probably be undefined. trying to access engine from universe.js

  // return //this was probably what was fucking up the check
  World.add(engine.world,[newbie]);
  // const forceMagnitude = 0.01  * newbie.mass;
  // Body.applyForce(newbie, { x: 0, y: 0 }, {
  //
  //   x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]),
  //   y: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1])
  // })

}

//function needed for checkBreedable. again, fuck engine.
const breed = function (p1, p2) {
  // in the middle of more properly functionalizing, but it's probably wrong in some crucial aspect
  console.log(p1, 'was p1 at start of breed in universe.js');
  console.log(p2, 'was p2 at start of breed universe.js');
  let newBase = {
    genealogy : ( (p1.genealogy.length>p2.genealogy.length) ? p1.genealogy : p2.genealogy )//bias towards p2.g when equal length
    ,compatibleBreed:(p1.compatibleBreed+p2.compatibleBreed)/20
    ,size : (p1.size+p2.size)/2
    ,power : (p1.power+p2.power)/2
    ,move : (p1.move+p2.move)/2
    ,energyFactor : (p1.energyFactor+p2.energyFactor)/2
    ,maxEnergy : (p1.maxEnergy +p2.maxEnergy )/2
    ,currentEnergy : (p1.currentEnergy +p2.currentEnergy )/2
    ,mutate : (p1.mutate+p2.mutate)/2  //mutate doesn't exist yet as a creature property.

  }
  // console.log(newBase, "was newBase, hoping they're all correct data types"); // they were not.
  //size and mutate were NaN
  //Math.floor(Math.random()*(rangeMax-rangeMin+1)) + rangeMin;
  // console.log(Common, 'was Common');
  // let polarity = Common.choose([-1,1]);
  let polarity = function () {
    return Common.choose([-1,1]);
  }
  // let mutationValue = Math.floor(Math.random()*(newBase.mutate - 0 + 1 ) );
  let mutationValue = function () {
    return Math.floor(Math.random()*(newBase.mutate - 0 + 1 ) );
  }
  // console.log(polarity, 'was polarity');
  // console.log(mutationValue, 'was mutationValue');
  // console.log(polarity*mutationValue, 'a possible outcome of polarity*mutationValue');
  // console.log(polarity(), 'was polarity()');
  // console.log(mutationValue(), 'was mutationValue()');
  // console.log(polarity()*mutationValue(), 'a possible outcome of polarity()*mutationValue()');
  // let mutagen = function (){
  //   return ( Common.choose([-1,1]) ) * (Math.floor(Math.random()*(newBase.mutate - 0 + 1 ) ) )
  // } //i think i can leave out the zeros?
  let mutagen = function (){
    return polarity()*mutationValue();
  }
  //these seem to not be returning numbers when appropriate
  // console.log(mutagen(), 'was mutagen() call in breed function of universe.js');
  // console.log(mutagen, 'was mutagen in breed function of universe.js');
  // console.log(typeof (mutagen()), 'trying to get typeof for output of mutagen, this may be wonky, check docs');
  let newMutated = {
    genealogy : newBase.genealogy + Common.choose(['0','1','2','3','4','5','6','7','8','9','0'])
    ,compatibleBreed : newBase.compatibleBreed + ( (Math.floor( Math.random()*(3+1) ) )  )
    ,size : newBase.size + mutagen()
    ,power : newBase.power + mutagen()
    ,move : newBase.move + mutagen()
    ,energyFactor : newBase.energyFactor + mutagen()
    // ,maxEnergy : newBase.maxEnergy + mutagen()
    // ,currentEnergy : newBase.currentEnergy + mutagen()
    // max and current energy should be derived from energyFactor on creature creation
    ,mutate : newBase.mutate + mutagen()

  }
  // console.log(newMutated, 'was newMutated in breed() of universe.js. these should NOT be NaN but seem to be?');
  // do i need to put creatureInputs in the universe.js file and then pass it down to the places it is now? i think so?

  //im cheating here because i ALSO have a creatureInputs file. if i were trying to reference the function in the universe.js it would not work. neiether would this.creatureInputs or this.props.creatureInputs since this ins't a component i've passed a prop to.

  //fuckign terrible practice is about to happen
  // for(let i=0; i<1; i++) {
  //   let goForth = creatureInputs ( newMutated.genealogy ,newMutated.compatibleBreed ,newMutated.size ,newMutated.power ,newMutated.move ,newMutated.energyFactor ,newMutated.mutate )
  //   /*either call each newMutated[i] here as appropriate to the function params, or maybe use a .map function for newMutated to do the same?*/
  //   //will need to repeat goForth for whatever i end up deciding the brood size should be (10?)
  // }

  return creatureInputs ( newMutated.genealogy ,newMutated.compatibleBreed ,newMutated.size ,newMutated.power ,newMutated.move ,newMutated.energyFactor ,newMutated.mutate )


}
//also function for checkBreedable. fuck engine yet again.

const fight = function(c1, c2)  {
  if( (c1.isStatic||c2.isStatic) ){
    console.log('fight was called against a wall');
    return
  } //was this what was fucking everything up?
  // console.log('fight was called');
  // console.log(c1, 'c1 in fight call in universe.js');
  // console.log(c2, 'c2 in fight call in universe.js');
  let c1fitness = c1.size * c1.move * c1.power * c1.currentEnergy
  // console.log(c1fitness, 'was c1fitness')

  let c2fitness = c2.size * c2.move * c2.power * c2.currentEnergy
  // console.log(c2fitness, 'was c2fitness')

  let result = c1fitness - c2fitness
  console.log(result, 'was result in fight')


  //switch true idea from http://data.agaric.com/how-use-less-or-greater-switch-statement
  switch (true) {
    case (result < 0):
      c2.currentEnergy += c1.energyFactor+ c1.currentEnergy*10; //c2 eats c1, gains energy based on c1 energy stats //maybe account for magnitude of victory somehow?
      if(c2.currentEnergy < c2.maxEnergy){ c2.currentEnergy = c2.maxEnergy} //if that gives c2 more than it's max energy, have max energy instead
      console.log(c1, 'was c1, about to be "removed"');
      Composite.remove(engine.world, c1);
      console.log(c1, 'was c1 after "removal"');

      break;
    case (result === 0):
      console.log(c1, c2, 'was c1,c2 about to be "removed"');
      Composite.remove(engine.world, c1);
      Composite.remove(engine.world, c2);
      console.log(c1, c2, 'was c1,c2 after  "removal"');
      break;
    case (result > 0):
    c1.currentEnergy += c2.energyFactor+ c2.currentEnergy*10; //c1 eats c2, gains energy based on c2 energy stats //maybe account for magnitude of victory somehow?
    if(c1.currentEnergy < c1.maxEnergy){ c1.currentEnergy = c1.maxEnergy}//if c1 gains more than max energy, instead obtain max energy
      console.log(c2, 'was c2, about to be "removed"');
      Composite.remove(engine.world, c2);
      console.log(c2, 'was c2 after "removal"');
      break;
    default:
      console.log('violence is never the answer, at least today'); //this should never happen as violence or sex is always the answer #grimdarkyolo
  }//end of switch
}

//function needed for collision checks. needs to be here because fuck engine.
const checkMarryKill = function(/*event*/){
  // console.log('checkMarryKill was called');
  // (event)=>
  // console.log('checkMarryKill called');
  //this is where i will put the checkBreedable() call. play arround with the "collision___" string to see if Start/Active/End makes 'better' behavior
  engine.pairs.list.forEach( (el) => {
    // checkBreedable(el.bodyA, el.bodyB) //may need to implement a check for either body being "isStatic"(is a wall) and to skip further checks if one of the bodies "isStatic"
    // console.log(el, 'el in checkMarryKill .list array');

    // for some reason, contacts with other non-wall bodies are not being recognized.

    if( (el.bodyA.isStatic||el.bodyB.isStatic) ){
      return {}
    }
    else if( checkBreedable(el.bodyA,el.bodyB) ){
      // console.log(checkBreedable(el.bodyA,el.bodyB), 'was checkBreedable(el.bodyA,el.bodyB) before breed call');
      // console.log(el.bodyA, el.bodyB,'el.bodyA and el.body B just prior to breed call');
      // //no size in the bodies here
      breed(el.bodyA,el.bodyB)
    } else if( !checkBreedable(el.bodyA,el.bodyB) ){
      // console.log(checkBreedable(el.bodyA,el.bodyB),'was checkBreedable(el.bodyA,el.bodyB) just prior to fight call');
      fight(el.bodyA,el.bodyB)
    }
  })

}


//end of function needed for collision check
//log shit on collisions
// Events.on(engine, 'collisionStart', ()=>{
//   console.log('collisionStart detected in universe.js');
// })
Events.on(engine, 'collisionStart', checkMarryKill)
const ticks = Runner.create();
Runner.start(ticks,engine);

//////
//necessary shit i want to export but can't ends here

//moving this shit under the necessary shit in hope that it will have access to the above var declarations. //engine was still not defined at creatureInputs

//req'd js files
// const checkBreedable = require('./../creatureMod/checkBreedable.js');
// const checkMarryKill = require('./../creatureMod/checkMarryKill.js');
// const breed = require('./../creatureMod/breed.js');
// const fight = require('./../creatureMod/fight.js');
// const malleableDefaults = require('./../creatureMod/malleableDefaults.js');
// // const creatureInputs = require('./../creatureMod/creatureInputs.js');

//moved shit to be under var declarations


const Universe = React.createClass ( {

  getInitialState : function (){
    return {
      // createTheUniverse: true;
    }
  }

  ,componentDidMount :  function (){
    // const ticks = 'test';//is not recognized when i check console
  }

  // //this was from when i was trying to import everything
  // ,checkBreedable
  // ,checkMarryKill
  // ,breed
  // ,fight
  // ,malleableDefaults
  // ,creatureInputs
  // ,universeProperties


//what would i have to do so taht i could reference another file's function here. maybe name the const ___ = require('FILEPATH') as the key i want ot use here, then just have the file contents as the value? here, the function? what will need to be defined specifically in that file?
  // ,creatureInputs : function (genealogy ,compatibleBreed ,size ,power ,move ,energyF ,mutate = 2) {
  //   console.log(genealogy ,compatibleBreed ,size ,power ,move ,energyF ,mutate , 'was genealogy ,compatibleBreed ,size ,power ,move ,energyF ,mutate in creatureInputs() of universe.js');
  //   //do i even need to variablize this? can i just do World.add(engine.world, [Bodies.circle(/*passed inputs*/)
  //   //100-400 range guarantees inside canvas
  //   console.log(this.props,"was this.props in creature inputs");
  //   const rangeMin = 100;
  //   const rangeMax = 400;
  //   const x_coord = Math.floor(Math.random()*(rangeMax-rangeMin+1)) + rangeMin;
  //   const y_coord = Math.floor(Math.random()*(rangeMax-rangeMin+1)) + rangeMin; //not DRY, but want different ones each time. functionalize?
  //   //limit creature sizes between 10 and 50 :
  //   //( 5+( (15*size^1.001)/(size^1.001) ) )
  //   // const scaledSize = 10+( (40*size^1.001)/(size^1.001) );
  //   //the above formula was not behaving as expected. trying the following instead: y= 10+(10x^1.3)/(x) where 0<x<10
  //   const scaledSize = 10+( 10*Math.pow(size, 1.3 ) ) /(size) ;
  //   console.log('just before Bodies.circle() called in creatureInputs');
  //   const newbie = Bodies.circle(x_coord,y_coord, scaledSize, malleableDefaults(genealogy ,compatibleBreed ,size ,power ,move ,energyF ,mutate));
  //   // console.log(this.props.engine.world,'was this.props.engine.world in creatureInputs');
  //   //
  //   // World.add(this.props.engine.world,[newbie])
  //   console.log(engine.world,'was this.props.engine.world in creatureInputs');
  //   //will probably be undefined. trying to access engine from universe.js
  //
  //   World.add(engine.world,[newbie])
  //
  // }





  ,render : function() {
    // debugger;
    // universeProperties()
    // console.log( 'engine inside render, but before return', engine);
      return (
        <div className="universeWrapper">

          <CreatureGenerator
            engine={engine}
            creatureInputs={creatureInputs}

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
          <CreatureList
            engine={engine}
            label="List of Current Creatures"
            />

        </div>
      )
      //do creaturelist later. moved down here for visual reminder

  }

})



module.exports = Universe;
