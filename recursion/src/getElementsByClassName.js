// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

/*

https://developer.mozilla.org/en-US/docs/Web/API/document.getElementsByClassName

Returns an array-like object of all child elements which have all 
of the given class names. When called on the document object, 
the complete document is searched, including the root node. 
You may also call getElementsByClassName() on any element; 
it will return only elements which are descendants of the specified 
root element with the given class names.

*/

var getElementsByClassName = function(className) {
    var rv = [];
    
    var recurse = function(element, className) {
        
        var classes = (element.className == undefined) ? [] : element.className.split(' ');
        if (classes.indexOf(className) > -1) {
            rv.push(element);
        }
        
        var children = element.childNodes;
        if (children.length > 0) {
            for (var i=0; i<children.length; i++) {
                recurse(children[i], className);
            }
        }
    };
    recurse(document.documentElement, className);
    
    return rv;
};
