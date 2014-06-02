define([], function () {
	'use strict';

    var iter = function (iterable, callback) {
        return Array.prototype.forEach.call(iterable, callback);
    };

    return {
    	iter: iter
    };
});