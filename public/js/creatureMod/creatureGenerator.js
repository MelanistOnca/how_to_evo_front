// have empty fields for people to create starting stats for creatures.
// have a selector/field to allow n-number starting creatures

const React = require('react');
const Matter = require('matter-js');
const $ = require('jquery');

// console.log('creatureGenerator ran');

//matter-js reqs
const    World = Matter.World;
const    Bodies = Matter.Bodies;
const    Common = Matter.Common;

const CreatureGenerator = React.createClass ( {

  /*getInitialState and onBlur functions heavily inpsired by http://www.peterbe.com/plog/onchange-in-reactjs */
  getInitialState : function () {
    return {
      size: ''
      ,power: ''
      ,move: ''
      ,energyFactor: ''
    }
  }

//make  different onBlur functions for each field? sizeOnBlur, powerOnBlur, etc to reference specifically for that field? non-DRY af, but may save me time?
  ,sizeOnBlur : function (event) {


    // console.log(event.target.id,'was event.target.id');
    // console.log(event.target.value, 'was event.target.value');
    // this.state.(event.target.id) = event.target.value
    // this.state.size
    this.setState({
      size: parseInt(event.target.value)
      // typed: event.target.value
    })
  }
  ,powerOnBlur : function (event) {


    // console.log(event.target.id,'was event.target.id');
    // console.log(event.target.value, 'was event.target.value');
    // this.state.(event.target.id) = event.target.value
    // this.state.size
    this.setState({
      power: parseInt(event.target.value)
      // typed: event.target.value
    })
  }
  ,moveOnBlur : function (event) {


    // console.log(event.target.id,'was event.target.id');
    // console.log(event.target.value, 'was event.target.value');
    // this.state.(event.target.id) = event.target.value
    // this.state.size
    this.setState({
      // move: parseInt(event.target.value)
      move: parseInt(event.target.value)
      // typed: event.target.value
    })
  }
  ,energyFactorOnBlur : function (event) {


    // console.log(event.target.id,'was event.target.id');
    // console.log(event.target.value, 'was event.target.value');
    // this.state.(event.target.id) = event.target.value
    // this.state.size
    this.setState({
      energyFactor: parseInt(event.target.value)
      // typed: event.target.value
    })
    // console.log(typeof 14, 'was 14 number'); //returned number
    // console.log(typeof '14', 'was 14 string'); //returned string
    // console.log(typeof this.state.energyFactor,'was energyFactor'); //returned string (wtf?). react state inspector shows it as a number
    // console.log(typeof parseInt('14'), 'was parseInt() of 14 string'); //returned number
  }

  ,handleClick : function (event) {
    // console.log('handleClick in creatureGen called');
    event.preventDefault();
    // const inputStrings = [
    //   ($('#size').value)
    //   ,$('#power').value
    //   ,$('#move').value
    //   ,$('#energyFactor').value]
    // console.log(inputStrings, 'was input strings, should be String');
    // const inputInt = inputStrings.map( (el)=>{
    //    return parseInt(el);
    // });
    // console.log(inputInt, 'was input int, should be Int s');
    // console.log(parseInt(this.state.size) ,parseInt(this.state.power) ,parseInt(this.state.move) ,parseInt(this.state.energyFactor));
    // console.log(
    //   typeof parseInt(this.state.size) ,typeof parseInt(this.state.power) ,typeof parseInt(this.state.move) ,typeof parseInt(this.state.energyFactor)
    // );
    // console.log(this.state.size,'this.state.size just before creatureInputs call in creatureGenerator.js');
    // console.log(this.state, 'this.state just before creatureInputs call in creatureGenerator.js');
    // console.log('just before this.props.creatureInputs() call in creatureGenerator.js');
    this.props.creatureInputs(
      Common.choose(['0','1','2','3','4','5','6','7','8','9','0','a','b','c','d','e'])
       ,2 ,parseInt(this.state.size) ,parseInt(this.state.power) ,parseInt(this.state.move) ,parseInt(this.state.energyFactor)/*list of input field refs*/);
    // console.log(this.state,'this.state AFTER creatureInputs call in creatureGenerator.js');
    // console.log('just AFTER this.props.creatureInputs() call in creatureGenerator.js');
  },





  render : function () {

    return (
      <div className="generatorContainer">
        creature generation stuff goes here <br/>
      <form action="" method="">
        <label>Size
          <input
            type="text"
            id="size"
            placeholder="1-10"
            required
            onBlur= {this.sizeOnBlur}>
          </input>

        </label>
        <label>Power
          <input type="text" id="power"  placeholder="1-10" required onBlur= {this.powerOnBlur}>

          </input>

        </label>
        <label>Move
          <input type="text" id="move"  placeholder="1-10" required onBlur= {this.moveOnBlur}>

          </input>
        </label>
        <label>Energy Factor
          <input type="text" id="energyFactor"  placeholder="1-10" required onBlur= {this.energyFactorOnBlur}>

          </input>

        </label>
        <button onClick={this.handleClick}>Add Creature</button>

        </form>
      </div>
    )
  }



})

module.exports = CreatureGenerator;
