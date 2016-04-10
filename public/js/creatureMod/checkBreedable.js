//this function will probably need to be ported over to universe.js

//c1 stands for "first creature", c2 for "second creature"
const checkBreedable = function (c1,c2) {
  if((c1.isStatic||c2.isStatic)){return}

  console.log(c1,'was c1 in checkBreedable file');
  console.log(c2,'was c2 in checkBreedable file');
  let c1match = c1.genealogy
                  .split('', (c1.genealogy.length-c1.compatibleBreed) )
                  .join('') ;
  console.log(c1match, 'c1match after declaration');

  let c2match = c2.genealogy
                  .split('', (c2.genealogy.length-c2.compatibleBreed) )
                  .join('') ;
  console.log(c2match, 'c2match after declaration');

  let c1matchCompare = c1match.split('', c2match.length).join('');
  console.log(c1matchCompare, 'was c1matchCompare');

  let c2matchCompare = c2match.split('', c1match.length).join('');
  console.log(c2matchCompare, 'was c2matchCompare');

  if( c1match.length <= c2match.length ){

    if(c2matchCompare === c1match){
      return true; //are breedable, need to make sure the code that calls this function is looking for a true before calling breed()
    }
    else {
      return false;
    }
  }
  else if(c1match.length>c2match.length){
    if(c1matchCompare === c2match){
      return true;
    }
    else {
      return false;
    }
  } //end of match checks
}

module.exports = checkBreedable;
