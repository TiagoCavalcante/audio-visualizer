# audio-visualizer

Performant 2D audio visualizer for React projects.

## Quickstart

```sh
npm install @tiagotrindade/audio-visualizer
```

audio-visualizer exports a component `AudioVisualizer` (as default), this component receives the following mandatory parameter:

- `audio` (type: `RefObject<HTMLAudioElement>`) — the element where the audio comes from

## Example

```jsx
import React, { useRef } from "react"
import AudioVisualizer from "@tiagotrindade/audio-visualizer"

function App() {
  const audio = useRef()

  return (
    <>
      <audio ref={audio} src="..." />

      <AudioVisualizer audio={audio} style={{ width: 100, height: 100 }} />
    </>
  )
}
```
