

fight : function (c1,c2) {
  let c1fitness = c1.size * c1.speed * c1.power * c1.currentEnergy //currentEnergy doesn't exist yet
  console.log(c1fitness, 'was c1fitness');

  let c2fitness = c2.size * c2.speed * c2.power * c2.currentEnergy //currentEnergy doesn't exist yet
  console.log(c2fitness, 'was c2fitness');

  let result = c1fitness - c2fitness;
  console.log(result, 'was result');

// removal info probably at http://brm.io/matter-js/docs/classes/Composite.html#method_remove and http://brm.io/matter-js/docs/classes/World.html#method_remove

//from source at github:

/**
     * Composite.remove = function(composite, object, deep) {//blabla}
     * Generic remove function. Removes one or many body(s), constraint(s) or a composite(s) to the given composite.
     * Optionally searching its children recursively.
     * Triggers `beforeRemove` and `afterRemove` events on the `composite`.
     * @method remove
     * @param {composite} composite
     * @param {} object
     * @param {boolean} [deep=false]
     * @return {composite} The original composite with the objects removed
     */
//possibly this instead? http://brm.io/matter-js/docs/classes/Composite.html#method_clear

  switch (result) {
    case (result < 0):
      c2.energy.currentEnergy += c1.energy.energyFactor+ c1.energy.currentEnergy*10; //c2 eats c1, gains energy based on c1 energy stats //maybe account for magnitude of victory somehow?
      if(c2.energy.currentEnergy < c2.energy.maxEnergy){ c2.energy.currentEnergy = c2.energy.maxEnergy} //if that gives c2 more than it's max energy, have max energy instead
      remove(c1); //remove doesn't exist yet. see about how matter-js would do this
      //Composite.remove(world, c1, /* not sure if the deep param is needed */) //world may also need to be World or engine or something else. it's the "parent" composite of c1. this MAY also be engine.pairs.list[i]
      break;
    case (result === 0):
      remove(c1);
      remove(c2);
      break;
    case (result > 0):
    c1.energy.currentEnergy += c2.energy.energyFactor+ c2.energy.currentEnergy*10; //c1 eats c2, gains energy based on c2 energy stats //maybe account for magnitude of victory somehow?
    if(c1.energy.currentEnergy < c1.energy.maxEnergy){ c1.energy.currentEnergy = c1.energy.maxEnergy}//if c1 gains more than max energy, instead obtain max energy
    remove(c1);
      break;
    default:
      console.log('violence is never the answer, at least today'); //this should never happen as violence or sex is always the answer #grimdarkyolo
  }
}
