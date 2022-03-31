# react-equalizer

Performant 2D audio visualizer for React projects.

## Quickstart

```sh
npm install react-equalizer
```

audio-visualizer exports a component `AudioVisualizer` (as default), this component receives the following mandatory parameters:

- `audio` (type: `RefObject<HTMLAudioElement>`) — the element where the audio comes from
- `height` (type: `number`) — the height of the equalizer canvas
- `width` (type: `number`) — the width of the equalizer canvas

## Example

```jsx
import React, { useRef } from "react"
import Equalizer from "react-equalizer"

function App() {
  const audio = useRef()

  return (
    <>
      <audio ref={audio} src="..." />

      <Equalizer audio={audio} width={200} height={100} />
    </>
  )
}
```
