define(['audio', 'utils', 'consts', 'grid', 'lib/domReady!'], function (audio_context, utils, consts, canvas) {
    'use strict';

    var oscillators_by_touch_id = {};

    var BASE_FREQUENCY = 220; // Hz

    var make_oscillator = function (frequency) {
        var oscillator = audio_context.createOscillator();
        var gain_node = audio_context.createGainNode();
        gain_node.gain.value = 0.5;

        oscillator.connect(gain_node);
        gain_node.connect(audio_context.destination);
        oscillator.frequency.value = frequency;
        oscillator.type = 'sawtooth';

        oscillator.noteOn(0);
        return oscillator;
    };

    var get_frequency_for_position = function (x, y) {
        var screen_width = window.innerWidth;
        var screen_height = window.innerHeight;
        var is_landscape = screen_height < screen_width;
        var x_ratio = x / screen_width;
        var y_ratio = y / screen_height;

        if (is_landscape) {
            var semitone_index = Math.floor(consts.SEMITONE_COUNT * x_ratio);
            var octave_index = Math.floor(consts.OCTAVE_COUNT * y_ratio);

        } else {
            var semitone_index = Math.floor(consts.SEMITONE_COUNT * y_ratio);
            var octave_index = Math.floor(consts.OCTAVE_COUNT * x_ratio);
        }
        var frequency = BASE_FREQUENCY * Math.pow(2, (octave_index + semitone_index / consts.SEMITONE_COUNT));
        return frequency;
    };

	var handle_touch_start = function (event) {
        event.preventDefault();
        var touches = event.changedTouches;

        utils.iter(touches, function (touch) {
            var frequency = get_frequency_for_position(touch.pageX, touch.pageY);
        	var oscillator = make_oscillator(frequency);
			oscillators_by_touch_id[touch.identifier] = oscillator;
        });
    };

    var handle_touch_move = function (event) {
        event.preventDefault();
        var touches = event.changedTouches;
        utils.iter(touches, function (touch) {
            var oscillator = oscillators_by_touch_id[touch.identifier];
            var frequency = get_frequency_for_position(touch.pageX, touch.pageY);
            oscillator.frequency.value = frequency;
        });
    };

    var handle_touch_end = function (event) {
        event.preventDefault();
        var touches = event.changedTouches;
        utils.iter(touches, function (touch) {
            var oscaillator = oscillators_by_touch_id[touch.identifier];
            oscaillator.disconnect();
            delete oscillators_by_touch_id[touch.identifier];
        });
    };

    canvas.addEventListener('touchstart', handle_touch_start, false);
    canvas.addEventListener('touchend', handle_touch_end, false);
    canvas.addEventListener('touchcancel', handle_touch_end, false);
    canvas.addEventListener('touchleave', handle_touch_end, false);
    canvas.addEventListener('touchmove', handle_touch_move, false);

});