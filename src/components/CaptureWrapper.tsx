/*
    This component is a wrapper for the game. It provides a canvas element that is used to capture the game.
    It also provides a context that is used to control the game state.
    setGameState is basically a function that can be called anywhere in the app to change the game state.
*/

import React, {createContext, Dispatch, SetStateAction, useState, useRef, useEffect} from "react"
import {Canvas} from "@react-three/fiber"

type GameState = 'pregame' | 'story' | 'game' | 'end'
type GameStateContext = [ GameState, Dispatch<SetStateAction<GameState>>]
export const GameContext = createContext<GameStateContext>(null!)

//Global variables
export const chosenWords: string[10][] = []
// 0) verb
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
    "Murphy has insomnia, so like many other nights,\n\nhe finds himself _____ Waffle House at 2 am.",
    //1
    "He _____ _____ _____ in the early morning.",
    //2
    "Taking a seat next to a _____ _____ ,\n\nhe orders his hashbrowns _____ , _____ , and _____ .",
    //3
    "The XXX (previous noun) orders a _____ .",
    //4
    "When the meal arrives, he exclaims:\n\n\"I _____ _____ _____ !\" and eats _____ .",
    //5
    "Murphy's stomach _____ _____ ,\n\nwhich makes Murphy _____ _____ .",
    //6
    "But then suddenly, and without warning, Murphy's _____ ,\n\nthe _____ _____ , sat down across to him.",
    //7
    "They started to _____ ,\n\nand the XXX (previous noun) left, _____ .",
    //8
    "After this, Murphy decides it's time to head home.\n\nHe bids everyone a _____ _____ ,\n\nboards his XXX (previous noun), and _____ home.",
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
    const [ gameState, setGameState ] = useState<GameState>('pregame')
    const music = useRef<HTMLAudioElement>(null!)

    // Placeholder for changing game state
    useEffect(() => {
        music.current = new Audio('/Jazz_Waffle.wav')
        music.current.loop = true
    }, [])

    const handClick = () => {
         music.current.play()
         music.current.volume = 0.1
        setGameState('story')
    }

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
        <Canvas ref={canvasRef} style={{width: '700px', height: '80%'}}>
            {children}
        </Canvas>
        { gameState === 'pregame' ? <button onClick={handClick}>Start</button> : null }
        { gameState === 'end' ? <button onClick={capture}>Capture</button> : null }
    </GameContext.Provider>
}
