var React = require('react');

module.exports = React.createClass({
	
	pokedex:function(){

  var ajax = new XMLHttpRequest();
    ajax.addEventListener('load',function(){
      try {
        var data = JSON.parse(this.responseText);
        console.log(data)
      } catch(e) {
        console.log(e)
      }
    });
    ajax.open('GET','/pokedex');
    ajax.send();
  },

	render:function(){
			return {this.pokedex}
	}

})