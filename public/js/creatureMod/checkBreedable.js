//this function will probably need to be ported over to universe.js
// console.log('checkBreedable loaded');

//c1 stands for "first creature", c2 for "second creature"
const checkBreedable = function (c1,c2) {
  if((c1.isStatic||c2.isStatic)){return}

  console.log(c1,'was c1 in checkBreedable file');
  console.log(c2,'was c2 in checkBreedable file');
  console.log(c1.genealogy,'was c1.genealogy in checkBreedable file');
  console.log(c2.genealogy,'was c2.genealogy in checkBreedable file');
  let c1match = c1.genealogy
                  .split('', (c1.genealogy.length-c1.compatibleBreed) )
                  .join('') ;
  // console.log(c1match, 'c1match after declaration');

  let c2match = c2.genealogy
                  .split('', (c2.genealogy.length-c2.compatibleBreed) )
                  .join('') ;
  // console.log(c2match, 'c2match after declaration');

  let c1matchCompare = c1match.split('', c2match.length).join('');
  // console.log(c1matchCompare, 'was c1matchCompare');

  let c2matchCompare = c2match.split('', c1match.length).join('');
  // console.log(c2matchCompare, 'was c2matchCompare');

  if( c1match.length <= c2match.length ){
    // console.log('c1match.length compared to c2match.length');
    if(c2matchCompare === c1match){
      // console.log('c2matchCompare === c1match');
      return true; //are breedable, need to make sure the code that calls this function is looking for a true before calling breed()
    }
    else {
      // console.log('c2matchCompare did not equal c1match');
      return false;
    }
  }
  else if(c1match.length>c2match.length){
    // console.log('c1match.length > c2match.length');
    if(c1matchCompare === c2match){
      // console.log('c1matchCompare === c2match');
      return true;
    }
    else {
      // console.log('c1matchCompare did not equal c2match');
      return false;
    }
  } //end of match checks
}

module.exports = checkBreedable;
