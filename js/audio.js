define([], function () {
	'use strict';

	var AudioContext = window.AudioContext || window.webkitAudioContext;
	
	var context = null;
	if (AudioContext) {
		context = new AudioContext();
	}

	
	return context;

});