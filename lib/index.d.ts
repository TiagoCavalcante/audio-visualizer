import { HTMLProps, RefObject } from "react"

declare type AudioVisualizerProps = HTMLProps<HTMLDivElement> & {
  audio: RefObject<HTMLAudioElement>
  amplitude?: number
}
declare function AudioVisualizer({
  audio,
  amplitude,
  ...props
}: AudioVisualizerProps): JSX.Element

export { AudioVisualizerProps, AudioVisualizer as default }
