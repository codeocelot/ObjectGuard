var Proxy = require('harmony-proxy');

function PropertyNotFoundError(message){
	this.message = message;
}

PropertyNotFoundError.prototype = new Error;

var defaultHandler = {
	// get
	get:function(target,property,reciever){
		if(target && target[property]){
			console.log('works');
			return target[property];
		}
		else {
			console.log('doesnt');
			throw new PropertyNotFoundError(`target ${target} has no property ${property}`);
		}
			
	},
};

//module.exports = function(obj){
//	return new Proxy(obj,handler);
//}

module.exports = function(obj,handler){
	return new Proxy(obj || {}, handler || defaultHandler);
}
