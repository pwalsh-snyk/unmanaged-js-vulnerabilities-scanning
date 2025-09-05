// Vendor libraries copied directly into codebase by development team
// These are NOT managed by package.json - they're just copy/pasted!

// ========================================
// jQuery 1.8.0 (VULNERABLE VERSION)
// ========================================
// Developer comment: "Copied from jQuery website in 2013, works fine so never updated"

/*! jQuery v1.8.0 jquery.com | jquery.org/license */
(function(a,b){function G(a){var b=F[a]={};return p.each(a.split(s),function(a,c){b[c]=!0}),b}function J(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(I,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:+d+""===d?+d:H.test(d)?p.parseJSON(d):d}catch(f){}p.data(a,c,d)}else d=b}return d}function K(a){var b;for(b in a){if(b==="data"&&p.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function ba(a,c,d){var e=c+"defer",f=c+"queue",g=c+"mark",h=p.data(a,e,b,!0);h&&(d==="queue"||!p.data(a,f,b,!0))&&(d==="mark"||!p.data(a,g,b,!0))&&setTimeout(function(){!p.data(a,f,b,!0)&&!p.data(a,g,b,!0)&&(p.removeData(a,e,!0),h.resolve())},0)}function bb(a){for(var b in a)if(b!=="data"||!p.isEmptyObject(a[b]))return!1;return!0}
// ... (truncated for brevity, but this is the actual vulnerable jQuery 1.8.0 code)

// Make jQuery available globally
window.$ = window.jQuery = $;

// ========================================
// Lodash 2.0.0 (VULNERABLE VERSION) 
// ========================================
// Developer comment: "Found this utility library online, copied it over"

/*! Lo-Dash v2.0.0 lodash.com/license | Underscore.js 1.4.4 underscorejs.org/LICENSE */
var _ = (function() {
    'use strict';
    
    function lodash(value) {
        return (value instanceof lodash) ? value : new lodash(value);
    }
    
    lodash.VERSION = '2.0.0';
    
    // Vulnerable utility functions (prototype pollution risks)
    lodash.extend = function(object) {
        if (!object) return object;
        for (var source, sourceIndex = 1, length = arguments.length; sourceIndex < length; sourceIndex++) {
            source = arguments[sourceIndex];
            for (var key in source) {
                object[key] = source[key]; // VULNERABLE: No prototype pollution protection
            }
        }
        return object;
    };
    
    lodash.map = function(collection, iterator, thisArg) {
        var result = [];
        if (!collection) return result;
        for (var i = 0, length = collection.length; i < length; i++) {
            result[i] = iterator.call(thisArg, collection[i], i, collection);
        }
        return result;
    };
    
    return lodash;
})();

// Make lodash available globally  
window._ = _;
