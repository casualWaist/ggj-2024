
/*
    This component is a wrapper for the game. It provides a canvas element that is used to capture the game.
    It also provides a context that is used to control the game state.
    setGameState is basically a function that can be called anywhere in the app to change the game state.
*/

import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from "react"
import {Canvas} from "@react-three/fiber"

type GameState = [ 'pregame' | 'story' | 'game' | 'end', Dispatch<SetStateAction<'pregame' | 'story' | 'game' | 'end'>>]
export const GameContext = createContext<GameState>(null!)

export default function CaptureWrapper({ children }: { children: React.ReactNode }) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null!)
    const [ gameState, setGameState ] = useState<'pregame' | 'story' | 'game' | 'end' >('story')

    // Placeholder for changing game state


    // Called when recording is stopped to download the video
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

    return <GameContext.Provider value={[gameState, setGameState]}>
        <Canvas ref={canvasRef} style={{width: '80%', height: '80%'}}>
            {children}
        </Canvas>
        { gameState === 'end' ? <button onClick={capture}>Capture</button> : null }
    </GameContext.Provider>
}
