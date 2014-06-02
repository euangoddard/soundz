define([], function () {

    'use strict';

    var convert_to_percent = function (amount, limit) {
        return amount / limit;
    }

    var convert_hsla_to_rgba = function (h, s, l, a) {
        var rgba;
        h = convert_to_percent(parseInt(h, 10) % 360, 360);
        s = convert_to_percent(parseInt(s, 10) % 101, 100);
        l = convert_to_percent(parseInt(l, 10) % 101, 100);
        a = parseFloat(a);

        if (s === 0) {
            var value = parseInt(Math.round(255 * l));
            rgba = {
                r: value,
                g: value,
                b: value,
                a: a
            };
        } else {
            var q = l < 0.5 ? l * ( 1 + s ) : l + s - l * s;
            var p = 2 * l - q;
            rgba = {
                r: parseInt(( convert_hue_to_rgb(p, q, h + 1 / 3) * 256 ).toFixed(0), 10),
                g: parseInt(( convert_hue_to_rgb(p, q, h) * 256 ).toFixed(0), 10),
                b: parseInt(( convert_hue_to_rgb(p, q, h - 1 / 3) * 256 ).toFixed(0), 10),
                a: a
            };
        }
        return rgba;
    };

    var convert_to_percent = function (amount, limit) {
        return amount / limit;
    };

    var convert_hue_to_rgb = function (p, q, t) {
        if (t < 0) {
            t += 1;
        }
        if (t > 1) {
            t -= 1;
        }
        if (t < 1 / 6) {
            return p + ( q - p ) * 6 * t;
        }
        if (t < 1 / 2) {
            return q;
        }
        if (t < 2 / 3) {
            return p + ( q - p ) * ( 2 / 3 - t ) * 6;
        }
        return p;
    };

    var convert_hsla_to_rgba_string = function (h, s, l, a) {
        var rgba = convert_hsla_to_rgba(h, s, l, a);
        var rgba_string = 'rgba(' + rgba.r + ', ' + rgba.g + ', ' + rgba.b + ', ' + rgba.a + ')';
        return rgba_string;
    };

    return convert_hsla_to_rgba_string;
});
