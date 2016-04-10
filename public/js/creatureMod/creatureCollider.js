//THIS IS NOT USED IN CURRENT VERSION


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

//p1==="parent1", p2==="parent2"
// breed : function (p1, p2) {
//   newBase : {
//     genealogy : (p1.genealogy.length>p2.genealogy.length) ? p1.genealogy : p2.genealogy //bias towards p2.g when equal length
//     ,compatibleBreed : (p1.compatibleBreed+p2.compatibleBreed)/2
//     ,size : (p1.size+p2.size)/2
//     ,power : (p1.power+p2.power)/2
//     ,speed : (p1.speed+p2.speed)/2
//     ,energyFactor : (p1.energyFactor+p2.energyFactor)/2
//     ,maxEnergy : (p1.maxEnergy +p2.maxEnergy )/2
//     ,currentEnergy : (p1.currentEnergy +p2.currentEnergy )/2
//     ,mutate : (p1.mutate+p2.mutate)/2  //mutate doesn't exist yet as a creature property.
//
//   }
//   //Math.floor(Math.random()*(rangeMax-rangeMin+1)) + rangeMin;
//   ,mutagen : function (){Common.choose(-1,1) * Math.floor(Math.random()*(newBase.mutate - 0 + 1 ) ) + 0 //i think i can leave out the zeros?}
//   // ,newMutated : newBase.map( (el) => {
//   //   el = el + mutagen();
//   // })
//   ,newMutated : {
//     genealogy : newBase.genealogy + Common.choose('0','1','2','3','4','5','6','7','8','9','0')
//     ,compatibleBreed : newBase.compatibleBreed + ('' + Math.floor(Math.random()*(9+1))  );
//     ,size : newBase.size + mutagen()
//     ,power : newBase.power + mutagen()
//     ,speed : newBase.speed + mutagen()
//     ,energyFactor : newBase.energyFactor + mutagen()
//     // ,maxEnergy : newBase.maxEnergy + mutagen()
//     // ,currentEnergy : newBase.currentEnergy + mutagen()
//     // max and current energy should be derived from energyFactor on creature creation
//     ,mutate : newBase.mutate + mutagen()
//
//   }
//   ,goForth : /*doubt the 'this.' here will work like i want it to*/
//   // do i need to put creatureInputs in the universe.js file and then pass it down to the places it is now? i think so?
//   this.creatureInputs(newMutated.genealogy ,newMutated.compatibleBreed ,newMutated.size ,newMutated.power ,newMutated.speed ,newMutated.energyFactor ,newMutated.mutate/*either call each newMutated[i] here as appropriate to the function params, or maybe use a .map function for newMutated to do the same?*/)
//   //will need to repeat goForth for whatever i end up deciding the brood size should be (10?)
// }


//play around with 'collisonEnds' and the "collision during" term, which i need to look up
// Events.on(engine, 'collisionStart', (event) => {
//
//   engine.pairs.list.forEach( (el) => {
//
//     // checkBreedable(el.bodyA, el.bodyB) //may need to implement a check for either body being "isStatic"(is a wall) and to skip further checks if one of the bodies "isStatic"
//     if(checkBreedable(el.bodyA,el.bodyB)){
//       breed(el.bodyA,el.bodyB)//this function doesn't exist yet.
//     }
//     else {
//       fight(el.bodyA,el.bodyB)//this function also doesn't exist yet.
//     }
//   })
//
// })
