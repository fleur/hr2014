// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
    var rv = "";
        
    if (obj === null) {

        rv += 'null';
        
    } else if (typeof(obj) == 'string') {
        
        rv += '"' + obj + '"';
        
    } else if ((typeof(obj) == 'number') ||
               (typeof(obj) == 'boolean')) {
        
        rv += obj;            
    
    } else if (Array.isArray(obj)) {
        
        rv += '[';
        rv += obj.map(stringifyJSON).join(',');
        rv += ']';

    } else {
        var hasValues = false;
        
        rv += '{';
        for (var k in obj) {
            if ((k != 'functions') && (obj[k] !== undefined)) {
                hasValues = true;
                rv += stringifyJSON(k) + ':';
                rv += stringifyJSON(obj[k]);
                rv += ",";
            }
        }
        
        if (hasValues) {
            rv = rv.slice(0, -1);
        }
        
        rv += '}';
    }
        
    return rv;    
};
