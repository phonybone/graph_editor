// Define basic functionality to be used anywhere:
if (!String.prototype.format) {
    // 'some {0} string {1}'.format('this', 'that') -> 'some this string that'
    String.prototype.format = function() {
	var args = arguments;
	return this.replace(/{(\d+)}/g, function(match, number) { 
	    return typeof args[number] != 'undefined'
		? args[number]
		: match
	    ;
	});
    };
}

// return an array of the values of an object:
function values(obj) { 
    var vals=[]
    Object.keys(obj).forEach(function(k) { 
	vals.push(obj[k])
    }) 
    return vals
}

if (typeof Object.create !== 'function') {
    console.log('creating Object.create!')
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

function extend(destination, source) {
    for (var k in source) {
	if (source.hasOwnProperty(k)) {
	    destination[k] = source[k];
	}
    }
    return destination; 
}

function extend_some(destination, source, some) {
    for (var i=0; i<some.length; i++) {
	var k=some[i]
	if (source.hasOwnProperty(k)) {
	    destination[k]=source[k]
	}
    }
    return destination
}

function use_mixin(cls, mixin) {
    if (!cls.prototype) cls.prototype=new Object()
    extend(cls.prototype, mixin.prototype)
    return cls
}

function f(x,y,z) {
    console.log('this is '+this)
    console.log('x is '+JSON.stringify(x))
    console.log('y is '+JSON.stringify(y))
    console.log('z is '+JSON.stringify(z))
    console.log(''+arguments.length+' args:  '+arguments)
    return arguments[0]
}

function dump() {
    for (var p in this) {
	if (this.hasOwnProperty(p)) {
	    console.log(p+': '+this[p])
	}
    }
}