# audio-visualizer

Performant 2D audio visualizer for React projects.

## Quickstart

```sh
npm install @tiagotrindade/audio-visualizer
```

audio-visualizer exports a component `AudioVisualizer` (as default), this component receives the following mandatory parameters:

- `audio` (type: `RefObject<HTMLAudioElement>`) — the element where the audio comes from
- `height` (type: `number`) — the height of the visualizer canvas
- `width` (type: `number`) — the width of the visualizer canvas

## Example

```jsx
import React, { useRef } from "react"
import AudioVisualizer from "@tiagotrindade/audio-visualizer"

function App() {
  const audio = useRef()

  return (
    <>
      <audio ref={audio} src="..." />

      <AudioVisualizer audio={audio} width={200} height={100} />
    </>
  )
}
```
