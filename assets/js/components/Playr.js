var React = require('react');

module.exports = React.createClass({
	getInitialState:function(){
    return{
      pokeData:{firstPokemon:{moves:[]},secondPokemon:{moves:[]}},
      win:"",
      show:false,
      winStyle:{display:'none'},
      losses:0,
      wins:0
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
    upData.firstPokemon.hp = upData.firstPokemon.hp - this.state.pokeData.secondPokemon.moves[Math.floor(Math.random()*1.9)].power;
    this.setState({
      pokeData:upData
    });
    if(this.state.pokeData.firstPokemon.hp<=0){
      this.setState({
        win:'lost.',
        losses: this.state.losses+1,
        winStyle:{
          height:'80vh',
          width:'80vw',
          position:'fixed',
          top:'10vh',
          left:'10vw',
          textAlign:'center',
          zIndex:'9',
          borderRadius:'5px',
        backgroundColor:'rgba(250,250,250,.9)'
        }
      });
    };
  },
  plyrAttack:function(pAttk){
    console.log('attack!!!')
    var upData = this.state.pokeData;
    upData.secondPokemon.hp = upData.secondPokemon.hp - pAttk;
    this.setState({
      pokeData:upData
    });
    if(this.state.pokeData.secondPokemon.hp <= 0 ){
      this.setState({
        win:'win!',
        wins: this.state.wins+1,
        winStyle:{
          height:'80vh',
          width:'80vw',
          position:'fixed',
          top:'10vh',
          left:'10vw',
          zIndex:'9',
          textAlign:'center',
          borderRadius:'5px',
        backgroundColor:'rgba(250,250,250,.9)'
        }
      });
    }else{
    this.comprAttack();
    };
  },
  componentWillMount:function(){
    this.pokedex();
  },
  replay:function(){
    this.setState({
      winStyle:{
        display:'none'
      }
    });
    this.pokedex();
  },
	render:function(){
      var img1="00"+this.state.pokeData.firstPokemon.id
      img1 = "http://assets22.pokemon.com/assets/cms2/img/pokedex/full/"+img1.slice(img1.length-3)+".png";
      var img2="00"+this.state.pokeData.secondPokemon.id;
      img2 = "http://assets22.pokemon.com/assets/cms2/img/pokedex/full/"+img2.slice(img2.length-3)+".png";
      var self = this;
      var moves1 = this.state.pokeData.firstPokemon.moves.map(function(move, idx){
          var attack = self.plyrAttack.bind(self, move.power);
          return (
                <button className="btn btn-default attkBtn"><h5 onClick={attack} key={idx}>{move.name}</h5></button>
            )
      });
      var moves2 = this.state.pokeData.secondPokemon.moves.map(function(move, idx){
          var attack = self.plyrAttack.bind(self, move.power);
          return (
                <button className="btn btn-default attkBtn"><h5 key={idx}>{move.name}</h5></button>
            )
      });
      return (
        <div>
              <div className="pokeDiv2"><p className="pull-right">GARY OAK</p>
              <div className="nameAndPic2">
              <h2 id="compHlth">{this.state.pokeData.secondPokemon.name}</h2>
              <h4>HP:{this.state.pokeData.secondPokemon.hp}</h4>
              <img className="pokemon-image" src={img2} />
              </div>
              <div className="attackDiv2">
                 {moves2}
              </div>
              </div>
              <audio>
              <source src="Pokemon.mp3" type="audio/mpeg">
              Your browser does not support the audio element.
              </audio>
              <div className="pokeDiv1">
              <p>Player-One</p>
              <div className="nameAndPic1">
              <h2 id="plyrHlth">{this.state.pokeData.firstPokemon.name}</h2>
              <h4>HP:{this.state.pokeData.firstPokemon.hp}</h4>
              <img className="pokemon-image" src={img1} />
              </div>
              <div className="attackDiv1">
                  {moves1}
              </div>
              </div>
              <div style={this.state.winStyle}>
                <h1>You {this.state.win}</h1>
                <h3>Wins:{this.state.wins}</h3>
                <h3>Losses:{this.state.losses}</h3>
                <button onClick={this.replay} className="btn btn-success">Battle Again</button>
              </div>
          </div>
        )
	}

})