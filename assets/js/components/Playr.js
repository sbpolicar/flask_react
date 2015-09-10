var React = require('react');

module.exports = React.createClass({
	getInitialState:function(){
    return{
      pokeData:{firstPokemon:{moves:{}},secondPokemon:{moves:{}}}
    }
  },
	pokedex:function(){
    var self=this;
  var ajax = new XMLHttpRequest();
    ajax.addEventListener('load',function(){
      try {
        var data = JSON.parse(this.responseText);
        self.setState({
          pokeData:data
        });
        console.log(data)
      } catch(e) {
        console.log(e)
      }
    });
    ajax.open('GET','/api/pokedex');
    ajax.send();
  },
  comprAttack:function(){
    console.log('attack!!!')
    var upData = this.state.pokeData;
    upData.firstPokemon.hp = upData.firstPokemon.hp - 15;
    this.setState({
      pokeData:upData
    });
  },
  plyrAttack:function(pAttk){
    console.log('attack!!!')
    var upData = this.state.pokeData;
    upData.secondPokemon.hp = upData.secondPokemon.hp - pAttk;
    this.setState({
      pokeData:upData
    });
    window.setTimeout(this.comprAttack(cAttk), 2000);
  },
  componentWillMount:function(){
    this.pokedex();
  },
	render:function(){
      var img1="00"+this.state.pokeData.firstPokemon.id
      img1 = "http://assets22.pokemon.com/assets/cms2/img/pokedex/full/"+img1.slice(img1.length-3)+".png";
      var img2="00"+this.state.pokeData.secondPokemon.id;
      img2 = "http://assets22.pokemon.com/assets/cms2/img/pokedex/full/"+img2.slice(img2.length-3)+".png";
      var self = this;
      var moves1 = this.state.pokeData.firstPokemon.moves.map(function(move){
          var attack = self.plyrAttack.bind(self, move.power);
          return (
                <h5 onClick={attack}>move.name</h5>
            )
      });

      return (
        <div>
              <div className="pokeDiv1">
              <div className="nameAndPic1">
              <h2>{this.state.pokeData.firstPokemon.name}</h2>
              <h4>HP:{this.state.pokeData.firstPokemon.hp}</h4>
              <img className="pokemon-image" src={img1} />
              </div>
              <div className="attackDiv">
                  {moves1}
              </div>
              </div>
              <div className="pokeDiv2">
              <div className="nameAndPic2">
              <h2>{this.state.pokeData.secondPokemon.name}</h2>
              <h4>HP:{this.state.pokeData.secondPokemon.hp}</h4>
              <img className="pokemon-image" src={img2} />
              </div>
              <div className="attackDiv">
                
              </div>
              </div>
          </div>
        )
	}

})