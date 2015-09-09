var React = require('react');
var Playr = require('./Playr');

module.exports= React.createClass({
	
	// getInitialState:function(){
	//    	  return{
	//       pokedex: (var r = new XMLHttpRequest();
	//       		r.open('GET','/pokedex',true);
	//       		r.onreadystatechange = function () {
	// 			if (r.readyState != 4 || r.status != 200) return; 
	// 			console.log(r.responseText);
	// 		};
	//       	)
	// 	}


	render:function(){
		return(
				<div>
					<div><Playr /></div>
				</div>
			)
	}
});