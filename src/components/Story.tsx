import {useEffect, useState, useContext} from "react"
import { Text, Float } from "@react-three/drei"
import { GameContext } from "./CaptureWrapper"

export default function Story() {
    const [waiting, setWaiting] = useState<boolean>(false)
    const gameState = useContext(GameContext)

    useEffect(() => {
        const canvasElement = document.querySelector('canvas')

        canvasElement!.addEventListener('pointerdown', () => {
            if (waiting) {
                setWaiting(false)
                gameState[1]("game")
            }
        })
    }, []);


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
