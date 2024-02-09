/*
    This component is a wrapper for the game. It provides a canvas element that is used to capture the game.
    It also provides a context that is used to control the game state.
    setGameState is basically a function that can be called anywhere in the app to change the game state.
*/

import React, {createContext, useState, useRef, useEffect} from "react"
import {Canvas} from "@react-three/fiber"

export type GameState = {
    section: 'pregame' | 'story' | 'game' | 'play' | 'end'
    storyIndex: number
    wordIndex: number
    chosen: string[][]
}
type GameStateContext = [ GameState, (objOrFunc: Partial<GameState> | ((prevState: GameState) => Partial<GameState>)) => void ]
export const GameContext = createContext<GameStateContext>(null!)

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

export let storyPOS: Array<string[]> = [
    ["verb"],
    ["adj", "noun", "verb"],
    ["verb", "verb", "noun"],
    ["adj", "noun", "verb", "verb", "verb"],
    ["3/1", "noun"],
    ["verb", "adj", "noun", "noun"],
    ["verb", "adverb", "verb", "adverb"],
    ["relation", "adj", "noun"],
    ["verb", "3/1", "adj"],
    ["adj", "noun", "2/2", "verb"]
]

export const script: string[] = [
    //tutorial
    "Murphy has insomnia, so like many other nights,\n\nhe finds himself _____ Waffle House at 2 am.",
    //1
    "Riding in on his _____ _____, \n\nMurphy parks in the lot and _____ inside.",
    //2
    "He _____ _____ _____ in the early morning.",
    //3
    "Taking a seat next to a _____ _____ ,\n\nhe orders his hashbrowns _____ , _____ , and _____ .",
    //4 3/1 is previous noun
    "The 3/1 orders a _____ .",
    //5
    "When the meal arrives, he exclaims:\n\n\"I _____ _____ _____ !\" and eats _____ .",
    //6
    "Murphy's stomach _____ _____ ,\n\nwhich makes Murphy _____ _____ .",
    //7
    "But then suddenly, and without warning, Murphy's _____ ,\n\nthe _____ _____ , sat down across to him.",
    //8 3/1 is previous noun
    "They started to _____ ,\n\nand the 3/1 left, _____ .",
    //9 2/2 is previous noun
    "After this, Murphy decides it's time to head home.\n\nHe bids everyone a _____ _____ ,\n\nboards his 2/2, and _____ home."
]
export const adjectives: string[] = [
    "Sticky", "Gooey", "Tasty", "Slimy", "Round", "Massive", "Tiny", "Chewy", "Cheesy", "Peppery", "Noisy", "Smelly", "Stinky", "Snooty", "Stumpy", "Wet", "Moist", "Salty", "Chuffed", "Blue", "Goofy", "Shy", "Happy", "Morose", "Somber", "Wild", "Nervous", "Nauseous", "Hyper", "Childlike", "Elderly", "Formal", "Annoying", "Lovable", "Whimsical", "Wonderful", "Magical"
]
export const verbs: string[] = [
    "Smooch", "Maim", "Kick", "Sing", "Fart", "Slink", "Roll", "Shriek", "Walk", "Think", "Lick", "Crack", "Eat", "Swallow", "Flick", "Twist", "Pull", "Spin", "Bop", "Work", "Travel", "Drive", "Hop", "Skip", "Whip", "Twerk", "Nae-nae", "Dance", "Twirl", "Doze", "Jump", "Fall", "Slap", "Pedal", "Steal", "Toy", "Cartwheel", "Crawl"
]
export const adverbs: string[] = [
    "Nasally", "Rapidly", "Boisterously", "Doggedly", "Flatulently", "Angrily", "Noisily", "Tiredly", "Clumsily", "Excitedly", "Hurridly", "Worrily", "Daringly", "Sheepishly", "Flimsily", "Aggresively", "Passive-aggresively", "Sleepily", "Candidly", "Silently", "Loudly", "Brightly", "Invisibly", "Slowly", "Hungrily"
]
export const nouns: string[] = [
    "Banana", "Banana peel", "Donut", "Bagel", "Crab", "Monkey", "Eye", "Knife", "Cabbage", "Tire", "Fish", "Waffle", "Fries", "Burger", "Soda", "Bug", "Butter", "Dog", "Cheese", "Fridge", "Gummy worm", "Ice cream", "Mug", "Worm", "Rock", "Scooter", "Snake", "Spring", "Toast", "Fly", "Coffin", "Lips", "Forklift"
]
export const relations: string[] = [
    "Father", "Mother", "Brother", "Sister", "Grandfather", "Papa", "Mama", "Sibling", "Rival", "Enemy", "Best friend", "Mortal enemy", "Lawyer", "Dentist", "Client", "Caretaker", "Therapist", "Guardian angel"
]

/*const testChosen: string[][] = [
    ['Kick'],
    ["Gooey", "Forklift", "Maim"],
    ["Think", "Lick", "Knife"],
    ["Round", "Donut", "Crack", "Eat", "Swallow"],
    ["Donut", "Eye"],
    ["Smooch", "Cheesy", "Pasta", "Fish"],
    ["Kick", "Rapidly", "Roll", "Angrily"],
    ["Father", "Tasty", "Tire"],
    ["Swallow", "Donut", "Chewy"],
    ["Tiny", "Crab", "Knife", "Work"]
]*/


export default function CaptureWrapper({ children }: { children: React.ReactNode }) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null!)
    //THE LINE TO CHANGE !!! CHANGE THIS FOR IMMEDIATE TESTING
    const [ gameState, _setGameState ] = useState<GameState>({
        section: 'pregame',
        storyIndex: 0,
        wordIndex: 0,
        chosen: []
    })
    const capturing = useRef(false)
    const setGameState = ((objOrFunc: Partial<GameState> | ((prevState: GameState) => Partial<GameState>)) =>
        _setGameState((prevState) =>
        ({
            ...prevState,
            ...(typeof objOrFunc === 'function' ? objOrFunc(prevState) : objOrFunc)
        })))
    const music = useRef<HTMLAudioElement>(null!)
    const a = useRef(document.createElement("a"))
    const url = useRef<string>('')
    const media_recorder = useRef<MediaRecorder>(null!)

    useEffect(() => {
        music.current = new Audio('/Music/Jazz_Waffle.wav')
        music.current.loop = true
    }, [])

    const handClick = () => {
        music.current.play()
        music.current.volume = 0.1
        setGameState({ section: 'story' })
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

    const replay = () => {
        setGameState({ section: 'story', storyIndex: 0, wordIndex: 0, chosen: [] })
    }

    const download = () => {
        a.current.click()
    }

    const copy = () => {
        navigator.clipboard.writeText(url.current)
    }

    useEffect(() => {
        if (gameState.section === 'play' && !capturing.current) {
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
            capturing.current = true
            capture()
        }
        if (gameState.section === 'end') {
            media_recorder.current.stop()
        }
    }, [gameState])

    return <GameContext.Provider value={[gameState, setGameState]}>

        <Canvas ref={canvasRef} style={{width: '700px', height: '80%'}}>
            {children}
        </Canvas>

        { gameState.section === 'pregame' ? <>
            <img style={{position: "absolute"}} src="/murphytitlescreen.jpg" alt="title image" width={750}/>
        </> : null }

        <div style={{
            display: 'flex',
            position: 'absolute',
            width: '80%',
            bottom: '5%',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}>

            { gameState.section === 'pregame' ? <>
                <button className="funny-button" onClick={handClick}>Start</button>
            </> : null }

            {['play', 'end'].includes(gameState.section) ?
            <button className="funny-button" onClick={replay}>
                Replay?
            </button> : null}

            {gameState.section === 'end' ?
                <button className="funny-button" onClick={download}>
                    Download
                </button> : null}

            {gameState.section === 'end' ?
                <button className="funny-button" onClick={copy}>
                    Copy
                </button> : null}
        </div>

    </GameContext.Provider>
}
