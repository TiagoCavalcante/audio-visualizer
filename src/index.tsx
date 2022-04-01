import React, { HTMLProps, RefObject, useEffect, useRef } from "react"
import useMeasure from "react-use-measure"

export type AudioVisualizerProps = HTMLProps<HTMLDivElement> & {
  audio: RefObject<HTMLAudioElement>
  amplitude?: number
}

export default function AudioVisualizer({
  audio,
  amplitude = 1,
  ...props
}: AudioVisualizerProps) {
  const [container, bounds] = useMeasure()
  const canvas = useRef<HTMLCanvasElement>()

  useEffect(() => {
    if (!canvas.current) return
    if (!audio.current) return

    let animationFrame: number

    const audioContext = new AudioContext()
    const analyser = audioContext.createAnalyser()
    const context = canvas.current.getContext("2d")
    const source = audioContext.createMediaElementSource(audio.current)

    source.connect(analyser)
    analyser.connect(audioContext.destination)

    function render() {
      const frequencyBinCountArray = new Uint8Array(analyser.frequencyBinCount)
      const barCount = canvas.current.width / 2

      analyser.getByteFrequencyData(frequencyBinCountArray)

      context.clearRect(0, 0, canvas.current.width, canvas.current.height)
      context.fillStyle = "#ffffff"

      for (var i = 0; i < barCount; i++) {
        const barPosition = i * 4
        const barWidth = 2
        // Negative so it goes to the top.
        const barHeight = -(frequencyBinCountArray[i] / 2) * amplitude

        context.fillRect(
          barPosition,
          canvas.current.height,
          barWidth,
          barHeight
        )
      }

      animationFrame = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrame)
      analyser.disconnect()
      source.disconnect()
    }
  }, [amplitude, audio, canvas])

  return (
    <div ref={container} {...props}>
      <canvas ref={canvas} height={bounds.height} width={bounds.width} />
    </div>
  )
}
