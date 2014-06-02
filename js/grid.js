define(['hsla', 'utils', 'consts', 'lib/domReady!'], function (hsla, utils, consts) {
	'use strict';

	var COLOUR_WHITE = '#fff';

	var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    
    var draw_notes = function () {
        canvas.setAttribute('width', window.innerWidth + 'px');
        canvas.setAttribute('height', window.innerHeight + 'px');
        
        utils.iter(consts.OCTAVES, function (octave) {
            utils.iter(consts.SEMITONE_NAMES, function (semitone_name, semitone_index) {
                draw_note(octave, semitone_index, semitone_name);
            });
        });
    };
    
    var draw_note = function (octave, semitone_index, semitone_name) {
        var screen_width = window.innerWidth;
        var screen_height = window.innerHeight;
        var is_landscape = screen_height < screen_width;

        if (is_landscape) {
            // Draw semitones across and consts.OCTAVES down
            var note_width = screen_width / consts.SEMITONE_COUNT;
            var note_height = screen_height / consts.OCTAVE_COUNT;
            var left = semitone_index * note_width;
            var top = octave * note_height;

        } else {
            // Draw consts.OCTAVES across and semitones down
            var note_width = screen_width / consts.OCTAVE_COUNT;
            var note_height = screen_height / consts.SEMITONE_COUNT;
            var left = octave * note_width;
            var top = semitone_index * note_height;
        }

        ctx.fillStyle = hsla(
        	360 * semitone_index / consts.SEMITONE_COUNT,
        	100,
        	50 + 8 * octave,
        	1
    	);
        ctx.shadowColor = 'rgba(0, 0, 0, 0)';
        ctx.fillRect(left, top, note_width, note_height);
        ctx.fillStyle = COLOUR_WHITE;
        var font_size = parseInt(Math.min(note_width, note_height) / 2, 10);
        ctx.font = font_size + 'px Helvetica, sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 3;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.fillText(semitone_name, left + note_width / 2, top + (note_height + font_size) / 2);

    };

    
    window.addEventListener('resize', draw_notes, false);
    draw_notes();

    return canvas;

});