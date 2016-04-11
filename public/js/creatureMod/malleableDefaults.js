const Matter = require('matter-js');
const    Common = Matter.Common;
//the above are temp for conflict code

const malleableDefaults = function (genString ,compBreed ,size ,power ,move ,energyFactor ,mutate) {
  console.log(genString ,compBreed ,size ,power ,move ,energyFactor ,mutate , 'was genString ,compBreed ,size ,power ,move ,energyFactor ,mutate in malleableDefaults() in malleableDefaults.js');
  /*power, move, energyFactor would be this.refs._ITSELF_*/
  var temp = {
  restitution: 1 //hardcoded, blek
  ,friction: 0 //hardcoded, blek
  ,frictionAir: 0 //hardcoded, blek
  ,inertia: Infinity //hardcoded, blek
  // ,label: name
  //hardcoding for conflict to test fighting.
  // REMEMBER TO UNCODE FOR CONFLICT
  ,genealogy: genString
  // ,compatibleBreed: parseInt(compBreed) //is a number //should already be a number buuuut... may not be on user generated inputs
  // ,genealogy : Common.choose(['0','1','2','3','4','5','6','7','8','9','0','a','b','c','d','e'])
  ,compatibleBreed : 0 //allow some breeding, but really need to find where compatibleBreed values in the 10 range were coming from
  // //the aboves should ensure fighting if the genealogy is different

  ,size: size
  ,power: power
  ,move: move
  ,energyFactor: energyFactor
  ,maxEnergy: energyFactor*10
  ,currentEnergy: energyFactor*5
  ,mutate:  mutate

  }
  // console.log('malleableDefaults HARDCODED FOR CONFLICT. DO NOT FORGET TO FIX. DO NOT FORGET TO FIX.');
  return temp;
}

module.exports = malleableDefaults;
