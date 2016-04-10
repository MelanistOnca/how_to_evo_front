const malleableDefaults = function (genString ,compBreed ,size ,power ,move ,energyFactor ,name) {
  console.log(genString ,compBreed ,size ,power ,move ,energyFactor ,name , 'was genString ,compBreed ,size ,power ,move ,energyFactor ,name in malleableDefaults() in universe.js');
  /*power, move, energyFactor would be this.refs._ITSELF_*/
  var temp = {
  restitution: 1 //hardcoded, blek
  ,friction: 0 //hardcoded, blek
  ,frictionAir: 0 //hardcoded, blek
  ,inertia: Infinity //hardcoded, blek
  ,label: name
  ,genealogy: genString
  ,compatibleBreed: parseInt(compBreed) //is a number //should already be a number buuuut... may not be on user generated inputs
  ,power: power
  ,move: move
  ,energyFactor: energyFactor
  ,maxEnergy: energyFactor*10
  ,currentEnergy: energyFactor*5

  }
  return temp;
}

module.exports = malleableDefaults;
