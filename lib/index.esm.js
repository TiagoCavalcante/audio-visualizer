import React, { useRef, useEffect } from 'react';
import useMeasure from 'react-use-measure';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function AudioVisualizer(_a) {
    var audio = _a.audio, _b = _a.amplitude, amplitude = _b === void 0 ? 1 : _b, props = __rest(_a, ["audio", "amplitude"]);
    var _c = useMeasure(), container = _c[0], bounds = _c[1];
    var canvas = useRef();
    useEffect(function () {
        if (!canvas.current)
            return;
        if (!audio.current)
            return;
        var animationFrame;
        var audioContext = new AudioContext();
        var analyser = audioContext.createAnalyser();
        var context = canvas.current.getContext("2d");
        var source = audioContext.createMediaElementSource(audio.current);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        function render() {
            var frequencyBinCountArray = new Uint8Array(analyser.frequencyBinCount);
            var barCount = canvas.current.width / 2;
            analyser.getByteFrequencyData(frequencyBinCountArray);
            context.clearRect(0, 0, canvas.current.width, canvas.current.height);
            context.fillStyle = "#ffffff";
            for (var i = 0; i < barCount; i++) {
                var barPosition = i * 4;
                var barWidth = 2;
                // Negative so it goes to the top.
                var barHeight = -(frequencyBinCountArray[i] / 2) * amplitude;
                context.fillRect(barPosition, canvas.current.height, barWidth, barHeight);
            }
            animationFrame = requestAnimationFrame(render);
        }
        render();
        return function () {
            cancelAnimationFrame(animationFrame);
            analyser.disconnect();
            source.disconnect();
        };
    }, [amplitude, audio, canvas]);
    return (React.createElement("div", __assign({ ref: container }, props),
        React.createElement("canvas", { ref: canvas, height: bounds.height, width: bounds.width })));
}

export { AudioVisualizer as default };
