var React = require('react');

module.exports = React.createClass({
	
	var Comprmon = new XMLHttpRequest();
    ajax.addEventListener('load',function(){
      try {
        var data = JSON.parse(this.responseText);
      } catch(e) {
        console.log(e)
      }
    });
    ajax.open('GET','/api/pokedex');
    ajax.send();

	render:function(){
			this.Comprmon
	}

})