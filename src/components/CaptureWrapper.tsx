
/*
    This component is a wrapper for the game. It provides a canvas element that is used to capture the game.
    It also provides a context that is used to control the game state.
    setGameState is basically a function that can be called anywhere in the app to change the game state.
*/

import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from "react"
import {Canvas} from "@react-three/fiber"

type GameState = [ 'pregame' | 'story' | 'game' | 'end', Dispatch<SetStateAction<'pregame' | 'story' | 'game' | 'end'>>]
export const GameContext = createContext<GameState>(null!)

//Global variables
export const chosenWords: string[10][] = []
// verb
// 1) adj, noun, present tense verb
// 2) verb end in s, verb ending in ing, noun
// 3) adj, noun, past verb, past verb, past verb
// 4) #3 noun, noun
// 5) verb, adj, plural noun
// 6) present tense verb, adverb, present tense verb, adverb
// 7) relationship noun, adj, noun
// 8) verb, #3 noun, adj
// 9) adj, noun, #2 noun, present tense verb

export const script: string[] = [
    //tutorial
    "Murphy has insomnia, so like many other nights, he finds himself ________ Waffle House at 2 am.",
    //1
    "He ________  ________  ________ in the early morning.",
    //2
    "Taking a seat next to a ----- (adj) ----- (noun), he orders his hashbrowns -----, -----, and ----- (past tense verbs).",
    //3
    "The XXX (previous noun) orders a ----- (noun.",
    //4
    "When the meal arrives, he exclaims: \"I ----- (verb) ----- (adj) ----- (plural noun) !\" and eats ----- (adverb).",
    //5
    "Murphy's stomach ----- (present tense verb) ----- (adverb), which makes Murphy ----- (present tense verb) ----- (adverb).",
    //6
    "But then suddenly, and without warning, Murphy's ----- (relationship noun), the ----- (adj) ----- (noun), sat down across to him.",
    //7
    "They started to ----- (verb), and the XXX (previous noun) left, ----- (adj).",
    //8
    "After this, Murphy decides it's time to head home. He bids everyone a ----- (adj) ----- (noun), boards his XXX (previous noun), and ----- (present tense verb) home.",
    //9
    "",
]
export const nouns: string[] = [

]
export const adjectives: string[] = [

]
export const verbs: string[] = [

]
export const adverbs: string[] = [

]

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
