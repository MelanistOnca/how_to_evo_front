const breed = function (p1, p2) {
  // in the middle of more properly functionalizing, but it's probably wrong in some crucial aspect
  let newBase = {
    genealogy : ( (p1.genealogy.length>p2.genealogy.length) ? p1.genealogy : p2.genealogy )//bias towards p2.g when equal length
    ,compatibleBreed:(p1.compatibleBreed+p2.compatibleBreed)/2
    ,size : (p1.size+p2.size)/2
    ,power : (p1.power+p2.power)/2
    ,move : (p1.move+p2.move)/2
    ,energyFactor : (p1.energyFactor+p2.energyFactor)/2
    ,maxEnergy : (p1.maxEnergy +p2.maxEnergy )/2
    ,currentEnergy : (p1.currentEnergy +p2.currentEnergy )/2
    ,mutate : (p1.mutate+p2.mutate)/2  //mutate doesn't exist yet as a creature property.

  }
  console.log(newBase, "was newBase, hoping they're all correct data types"); // they were not.
  //size and mutate were NaN
  //Math.floor(Math.random()*(rangeMax-rangeMin+1)) + rangeMin;
  let mutagen = function (){
    Common.choose(-1,1) * Math.floor(Math.random()*(newBase.mutate - 0 + 1 ) ) + 0
  } //i think i can leave out the zeros?

  let newMutated = {
    genealogy : newBase.genealogy + Common.choose('0','1','2','3','4','5','6','7','8','9','0')
    ,compatibleBreed : newBase.compatibleBreed + ( (Math.floor( Math.random()*(9+1) ) )  )
    ,size : newBase.size + mutagen()
    ,power : newBase.power + mutagen()
    ,move : newBase.move + mutagen()
    ,energyFactor : newBase.energyFactor + mutagen()
    // ,maxEnergy : newBase.maxEnergy + mutagen()
    // ,currentEnergy : newBase.currentEnergy + mutagen()
    // max and current energy should be derived from energyFactor on creature creation
    ,mutate : newBase.mutate + mutagen()

  }
  console.log(newMutated, 'was newMutated in breed() of universe.js. these should NOT be NaN but seem to be?');
  // do i need to put creatureInputs in the universe.js file and then pass it down to the places it is now? i think so?
  let goForth = this.creatureInputs ( newMutated.genealogy ,newMutated.compatibleBreed ,newMutated.size ,newMutated.power ,newMutated.move ,newMutated.energyFactor ,newMutated.mutate )
  /*either call each newMutated[i] here as appropriate to the function params, or maybe use a .map function for newMutated to do the same?*/
  //will need to repeat goForth for whatever i end up deciding the brood size should be (10?)
}

module.exports = breed;
