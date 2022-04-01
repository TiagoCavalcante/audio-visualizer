import { HTMLProps, RefObject } from "react"

declare type AudioVisualizerProps = HTMLProps<HTMLDivElement> & {
  audio: RefObject<HTMLAudioElement>
}
declare function AudioVisualizer({
  audio,
  ...props
}: AudioVisualizerProps): JSX.Element

export { AudioVisualizerProps, AudioVisualizer as default }
