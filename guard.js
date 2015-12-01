var Proxy = require('harmony-proxy');

function PropertyNotFoundError(message){
	this.message = message;
}

PropertyNotFoundError.prototype = new Error;

var defaultHandler = {
	get:function(target,property,reciever){
		if(target && target[property]){
			return target[property];
		}
		else {
			throw new PropertyNotFoundError(`target ${target} has no property ${property}`);
		}
			
	},
};

module.exports = function(obj,handler){
	if(handler){
		defaultHandler.get = handler;
	}
	return new Proxy(obj || {}, defaultHandler );
}
