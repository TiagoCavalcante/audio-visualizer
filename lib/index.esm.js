import React, { useRef, useEffect } from 'react';

function Equalizer(_a) {
    var audio = _a.audio, height = _a.height, width = _a.width;
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
                var barHeight = -(frequencyBinCountArray[i] / 2);
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
    }, [audio, canvas]);
    return React.createElement("canvas", { ref: canvas, height: height, width: width });
}

export { Equalizer as default };
