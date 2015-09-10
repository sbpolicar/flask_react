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
  componentWillMount:function(){
    this.pokedex();
  },
	render:function(){
      var img1="00"+this.state.pokeData.firstPokemon.id
      img1 = "http://assets22.pokemon.com/assets/cms2/img/pokedex/full/"+img1.slice(img1.length-3)+".png";
      var img2="00"+this.state.pokeData.secondPokemon.id;
      img2 = "http://assets22.pokemon.com/assets/cms2/img/pokedex/full/"+img2.slice(img2.length-3)+".png";
      return (
        <div>
              <div className="pokeDiv1">
              <div className="nameAndPic1">
              <h2>{this.state.pokeData.firstPokemon.name}</h2>
              <h4>HP:{this.state.pokeData.firstPokemon.hp}</h4>
              <img className="pokemon-image" src={img1} />
              </div>
              <div className="attackDiv">
              <ul>
              <li>{this.state.pokeData.firstPokemon.moves.move1}</li>
              <li>{this.state.pokeData.firstPokemon.moves.move2}</li>
              </ul>
              </div>
              </div>
              <div className="pokeDiv2">
              <div className="nameAndPic2">
              <h2>{this.state.pokeData.secondPokemon.name}</h2>
              <h4>HP:{this.state.pokeData.secondPokemon.hp}</h4>
              <img className="pokemon-image" src={img2} />
              </div>
              <div className="attackDiv">
              <ul>
              <li>{this.state.pokeData.secondPokemon.moves.move1}</li>
              <li>{this.state.pokeData.secondPokemon.moves.move2}</li>
              </ul>
              </div>
              </div>
          </div>
        )
	}

})