import {useEffect, useState, useContext} from "react"
import {useThree, useFrame} from "@react-three/fiber"
import { Text, Float } from "@react-three/drei"
import { GameContext, chosenWords, script, nouns, adjectives, verbs, adverbs } from "./CaptureWrapper"

export default function Story() {
    //const camera = useThree(({camera}) => camera)
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
                {chosenWords[0]}
            </Text>
            </Float>
}
