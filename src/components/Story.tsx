import {useEffect, useState, useContext} from "react"
import { useFrame} from "@react-three/fiber"
import { Text, Float } from "@react-three/drei"
import { GameContext, chosenWords } from "./CaptureWrapper"

export default function Story() {
    //const camera = useThree(({camera}) => camera)
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
