
import { useState, useContext } from "react"
import { Text, Float } from "@react-three/drei"
import { GameContext } from "./CaptureWrapper"
import { script } from "./CaptureWrapper"

export default function Story() {
    const [waiting, setWaiting] = useState<boolean>(false)
    const gameState = useContext(GameContext)
    const canvasElement = document.querySelector('canvas')

    canvasElement!.addEventListener('pointerdown', () => {
        if (waiting) {
            setWaiting(false)
            gameState[1]("game")
        }
    })
    const handleClick = () => {
        gameState[1]('game')
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
                {script[6]}
            </Text>
        </Float>
    </>
}
