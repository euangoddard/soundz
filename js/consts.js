define([], function () {
	'use strict';

	var SEMITONE_NAMES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

	var OCTAVES = [0, 1, 2, 3];

    return {
    	OCTAVES: OCTAVES,
    	OCTAVE_COUNT: OCTAVES.length,
    	SEMITONE_NAMES: SEMITONE_NAMES,
    	SEMITONE_COUNT: SEMITONE_NAMES.length
    };
    
});