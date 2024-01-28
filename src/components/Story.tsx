import { useState, useContext } from "react"
import { Text, Float } from "@react-three/drei"
import { GameContext, script } from "./CaptureWrapper"
import { scriptIndex, setScriptIndex } from "../App.tsx"


export default function Story() {
    const gameState = useContext(GameContext)
    //const canvasElement = document.querySelector('canvas')

    //canvasElement!.addEventListener('pointerdown', () => {
    //})
    const handleClick = () => {
        wordType()
        gameState[1]("game")
    }

    return <>
        <mesh onClick={handleClick} position={[0, 0, 1]}>
            <planeGeometry args={[100, 10, 1, 1]}/>
            <meshStandardMaterial color="gray" transparent opacity={0}/>
        </mesh>
        <Float
            speed={5}
            rotationIntensity={.35}
            floatIntensity={1}>
            <Text
                scale={[0.35, 0.35, 0.35]}
                color="black"
                textAlign="center"
                position={[0, 0, 0]}
            >
                {script[scriptIndex]}
            </Text>
        </Float>
    </>
}

function wordType() {
    let words: string[]
    switch (scriptIndex) {
        case 0:
            words = ["verb"]
            break;
        case 1:
            words = ["adj", "noun", "verb"]
            break;
        case 2:
            words = ["verb", "verb", "noun"]
            break;
        case 3:
            words = ["adj", "noun", "verb", "verb", "verb"]
            break;
        case 4:
            words = ["3/2", "noun"]
            break;
        case 5:
            words = ["verb", "adj", "noun"]
            break;
        case 6:
            words = ["verb", "adverb", "verb", "adverb"]
            break;
        case 7:
            words = ["relation", "adj", "noun"]
            break;
        case 8:
            words = ["verb", "3/2", "adj"]
            break;
        case 9:
            words = ["adj", "noun", "2/3", "verb"]
            break;
        default:
            words = ["error"]
            break;
    }

    setScriptIndex(words, scriptIndex + 1)
}