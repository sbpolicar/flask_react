var React = require('react');

module.exports = React.createClass({
	getInitialState:function(){
    return{
      pokeData:{}
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
    ajax.open('GET','/pokedex');
    ajax.send();
  },
  componentWillMount:function(){
    this.pokedex();
  },
	render:function(){
			return (<div>{this.state.pokeData}</div>)
	}

})