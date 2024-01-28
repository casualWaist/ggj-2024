/*
    This component is a wrapper for the game. It provides a canvas element that is used to capture the game.
    It also provides a context that is used to control the game state.
    setGameState is basically a function that can be called anywhere in the app to change the game state.
*/

import React, {createContext, Dispatch, SetStateAction, useState, useRef, useEffect} from "react"
import {Canvas} from "@react-three/fiber"

type GameState = ['pregame' | 'story' | 'game' | 'play' | 'end', number]
type GameStateContext = [ GameState, Dispatch<SetStateAction<GameState>>]
export const GameContext = createContext<GameStateContext>(null!)

//Global variables
export const chosenWords: string[][] = []
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
    const [ gameState, setGameState ] = useState<GameState>(['play', 0])
    const music = useRef<HTMLAudioElement>(null!)
    const a = useRef(document.createElement("a"))
    const url = useRef<string>('')
    const media_recorder = useRef<MediaRecorder>(null!)

    // Placeholder for changing game state
    useEffect(() => {
        music.current = new Audio('/Jazz_Waffle.wav')
        music.current.loop = true
    }, [])

    const handClick = () => {
         music.current.play()
         music.current.volume = 0.1
        setGameState(['story', 0])
    }

    // Called when recording is stopped to download the video
    const on_media_recorder_stop = useRef((chunks: Blob[]) => {
        const blob = new Blob(chunks, { type: "video/webm" })
        url.current = URL.createObjectURL(blob)
        document.body.appendChild(a.current)
        a.current.style.display = "none"
        a.current.href = url.current
        a.current.download = "test.webm"
    })

    const download = () => {
        console.log(a.current, url.current)
        a.current.click()
    }

    const copy = () => {
        console.log(url.current)
        navigator.clipboard.writeText(url.current)
    }


    useEffect(() => {
        if (gameState[0] === 'play') {
            const chunks: Blob[] = []
            const canvas_stream = canvasRef.current!.captureStream(30); // fps
            // Create media recorder from canvas stream
            media_recorder.current = new MediaRecorder(canvas_stream, { mimeType: "video/webm; codecs=vp9" });
            const capture = () => {
                // Record data in chunks array when data is available
                media_recorder.current.ondataavailable = (evt) => { chunks.push(evt.data); };
                // Provide recorded data when recording stops
                media_recorder.current.onstop = () => {on_media_recorder_stop.current(chunks)}
                // Start recording using a 1s timeslice [ie data is made available every 1s)
                media_recorder.current.start(1000)
            }
            capture()
        }
        if (gameState[0] === 'end') {
            media_recorder.current.stop()
        }
    }, [gameState])

    return <GameContext.Provider value={[gameState, setGameState]}>
        <Canvas ref={canvasRef} style={{width: '700px', height: '80%'}}>
            {children}
        </Canvas>
        { gameState[0] === 'pregame' ? <button onClick={handClick}>Start</button> : null }
        { gameState[0] === 'end' ? <button onClick={download}>Download</button> : null }
        { gameState[0] === 'end' ? <button onClick={copy}>Copy</button> : null }
    </GameContext.Provider>
}
