import {useEffect, useState, useContext} from "react"
import {useThree, useFrame} from "@react-three/fiber"
import { Text, Float } from "@react-three/drei"
import { GameContext, chosenWords } from "./CaptureWrapper"

export default function Story() {
    const camera = useThree(({camera}) => camera)
    const [waiting, setWaiting] = useState<boolean>(false)
    const [gameState, setGameState] = useContext(GameContext)

    useEffect(() => {
        const canvasElement = document.querySelector('canvas')

        canvasElement!.addEventListener('pointerdown', () => {
            if (waiting) {
                setWaiting(false)
                setGameState("game")
            }
        })
    }, []);

    useFrame(() => {
        if (true) {

        }
    })

    const someText = [
        "Η¢´”µ≤µӘϐ°ɲϐæ›ɲ°Әϐæ¿°«˘›Әɲ≤æıµ˘´ɲ°𝖡µıϐ,\n\nhe finds himself ______ing (verb ending in -ing) Waffle House at 2 am.",
        "Riding on his ______ (adjective) ______ (noun),\n\nhe parks in the lot and steps inside.",
        "He ______s (verb) ______ing (verb ending in -ing)\n\n______ (noun) in the early morning."
    ]

    return <Float
            speed={5}
            rotationIntensity={0.5}
            floatIntensity={1}
            >
            <Text
                scale={[0.4, 0.4, 0.4]}
                color="black"
                textAlign="center"
                position={[0,0,0]}
                >
                {someText[0]}
            </Text>
            </Float>
}
        
