import React from "react"
import {Canvas} from "@react-three/fiber"


export default function CaptureWrapper({ children }: { children: React.ReactNode }) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null!)

    const on_media_recorder_stop = (chunks: Blob[]) => {
        const blob = new Blob(chunks, { type: "video/webm" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        document.body.appendChild(a)
        a.style.display = "none"
        a.href = url
        a.download = "test.webm"
        a.click()
        window.URL.revokeObjectURL(url)
    }
    const capture = () => {
        const chunks: Blob[] = []
        const canvas_stream = canvasRef.current!.captureStream(30); // fps
        // Create media recorder from canvas stream
        const media_recorder = new MediaRecorder(canvas_stream, { mimeType: "video/webm; codecs=vp9" });
        // Record data in chunks array when data is available
        media_recorder.ondataavailable = (evt) => { chunks.push(evt.data); };
        // Provide recorded data when recording stops
        media_recorder.onstop = () => {on_media_recorder_stop(chunks)}
        // Start recording using a 1s timeslice [ie data is made available every 1s)
        media_recorder.start(1000)
        setTimeout(() => {
            media_recorder.stop()
        }, 10000)
    }

    return <>
        <Canvas ref={canvasRef} style={{width: '80%', height: '80%'}}>
            {children}
        </Canvas>
        <button onClick={ capture }>Capture</button>
    </>
}
