
//p1==="parent1", p2==="parent2"
breed : function (p1, p2) {
  newBase : [
    (p1.size+p2.size)/2 //0
    ,(p1.power+p2.power)/2 //1
    ,(p1.speed+p2.speed)/2 //2
    ,(p1.energyFactor+p2.energyFactor)/2 //3
    ,(p1.mutate+p2.mutate)/2 //4 //mutate doesn't exist yet as a creature property.
    //will also need to include .compatibleBreed //5

  ]
  //Math.floor(Math.random()*(rangeMax-rangeMin+1)) + rangeMin;
  ,mutagen : function (){Common.choose(-1,1) * Math.floor(Math.random()*(newBase[4] - 0 + 1 ) ) + 0 //i think i can leave out the zeros?}
  ,newMutated : newBase.map( (el) => {
    el = el + mutagen();
  })
  ,goForth : this./*doubt the 'this.' here will work like i want it to*/creatureInputs(/*either call each newMutated[i] here as appropriate to the function params, or maybe use a .map function for newMutated to do the same?*/)
  //will need to repeat goForth for whatever i end up deciding the brood size should be (10?)
}
