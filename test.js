require('harmonize')();
var guard = require('./guard');
var assert = require('assert');

var obj1 = guard({});


describe('empty obj',function(){
	it('should throw an error for empty obj',function(){
		assert.throws(function(){
			var a = obj1.a;
		},function(err){
			console.log('caught error of ',JSON.stringify(err));
			console.log(err);
			if((err instanceof Error)){ return true;}
		})
	})
})

describe('non empty obj',()=>{
	describe('a non-existant property',()=>{
		it('should throw an error',()=>{
			assert.throws(function(){
				var a = obj1.a;
			},function(err){
				console.log('caught error of ',JSON.stringify(err));
				console.log(err);
				if((err instanceof Error)){ return true;}
			})
		});
	})
	describe('a well defined property',()=>{
		it('should set property',()=>{
			var obj = guard({});
			obj.a = 1;
			// force an access
			obj.a++;
			assert.equal(obj.a,2);
		});
	})
})

describe('custom handler',()=>{
	it('should use new handler',()=>{
		var target = {prop:'outvalue'};
		var property = 'prop';
		var obj = guard({},function(target,property,reciever)	{
			return target[property] === 'outvalue';	
		});
		/* == 'outvalue' */
		obj.prop = 'outvalue';
		assert.equal(obj.prop,true);
		/* != 'outvalue' */
		obj.prop = 'wellwater';
		assert.equal(obj.prop,false);
	})
});
