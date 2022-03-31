import { RefObject } from "react"

declare type AudioVisualizerProps = {
  audio: RefObject<HTMLAudioElement>
  height: number
  width: number
}
declare function AudioVisualizer({
  audio,
  height,
  width,
}: AudioVisualizerProps): JSX.Element

export { AudioVisualizerProps, AudioVisualizer as default }
