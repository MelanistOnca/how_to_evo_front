// have empty fields for people to create starting stats for creatures.
// have a selector/field to allow n-number starting creatures

const React = require('react');
const Matter = require('matter-js');
const $ = require('jquery');

console.log('creatureGenerator ran');

//matter-js reqs
const    World = Matter.World;
const    Bodies = Matter.Bodies;

const CreatureGenerator = React.createClass ( {


  handleClick : function (event) {
    console.log('handleClick in creatureGen called');
    event.preventDefault();
    const inputStrings = [$('#size'),$('#power'),$('#speed'),$('#energyFactor')]
    const inputInt = inputStrings.map( (el)=>{
       return parseInt(el);
    });

    this.creatureInputs(inputInt[0],inputInt[1],inputInt[2],inputInt[3]/*list of input field refs*/);
  },

  //  this.refs.name->pass to label field, this.refs.size, this.refs.speed, this.refs.power, this.refs.energyFactor       //add more as needed -> will need to slip in geneology string without making it visible?
  creatureInputs : function (size, power, speed, energyF) {
    //do i even need to variablize this? can i just do World.add(engine.world, [Bodies.circle(/*passed inputs*/)
    //100-400 range guarantees inside canvas
    const rangeMin = 100;
    const rangeMax = 400;
    const x_coord = Math.floor(Math.random()*(rangeMax-rangeMin+1)) + rangeMin;
    const y_coord = Math.floor(Math.random()*(rangeMax-rangeMin+1)) + rangeMin; //not DRY, but want different ones each time. functionalize?
    //limit creature sizes between 5 and 20 :
    //( 5+( (15*size^1.001)/(size^1.001) ) )
    const scaledSize = 5+( (15*size^1.001)/(size^1.001) );
    console.log('just before Bodies.circle() called in creatureInputs');
    const newbie = Bodies.circle(x_coord,y_coord, scaledSize, this.malleableDefaults(1,0,0,Infinity,'geneology string placeholder'));
    console.log(this.props.engine.world,'was this.props.engine.world in creatureInputs');

    World.add(this.props.engine.world,[newbie])

  },


// js
  malleableDefaults : function (restit ,fric ,airFric ,inert /* ,genString  ,name ,power ,speed ,energyFactor */ /* ,compBreed */) {
    /*power, speed, energyFactor would be this.refs._ITSELF_*/
    var temp = {
    restitution: restit
    ,friction: fric
    ,frictionAir: airFric
    ,inertia: inert
    // ,label: name
    // ,geneology: genString
    // ,compatibleBreed: parseInt(compBreed) //is a number
    // ,power: power
    // ,speed: speed
    // ,energy: {maxEnergy: energyFactor*10, currentEnergy: energyFactor*5}

    }
    return temp;
  },



  render : function () {

    return (
      <div className="generatorContainer">
        creature generation stuff goes here <br/>
      <form action="" method="">
        <label>Size<input type="text" id="size"  placeholder="1-10" required></input></label>
        <label>Power<input type="text" id="power"  placeholder="1-10" required></input></label>
        <label>Speed<input type="text" id="speed"  placeholder="1-10" required></input></label>
        <label>Energy Factor<input type="text" id="energyFactor"  placeholder="1-10" required></input></label>
        <button onClick={this.handleClick}>Add Creature</button>

        </form>
      </div>
    )
  }

// const boxA = Bodies.rectangle(370, 270, 40, 40,malleableDefaults(1,0,0,Infinity,'boxA name') );

})

module.exports = CreatureGenerator;
