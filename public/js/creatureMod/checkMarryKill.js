const checkMarryKill = function(event){
  // (event)=>{

  //this is where i will put the checkBreedable() call. play arround with the "collision___" string to see if Start/Active/End makes 'better' behavior
  engine.pairs.list.forEach( (el) => {
    // checkBreedable(el.bodyA, el.bodyB) //may need to implement a check for either body being "isStatic"(is a wall) and to skip further checks if one of the bodies "isStatic"
    if(checkBreedable(el.bodyA,el.bodyB)){
      this.breed(el.bodyA,el.bodyB)//this function doesn't exist yet.
    }
    else {
      this.fight(el.bodyA,el.bodyB)//this function also doesn't exist yet.
    }
  })

  // }
}

module.exports = checkMarryKill;
