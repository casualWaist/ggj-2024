import { useContext, useEffect} from "react"
import { Text, Float } from "@react-three/drei"
import { GameContext, script, chosenWords, adjectives, nouns, verbs, adverbs } from "./CaptureWrapper"

export default function Story() {
    const gameState = useContext(GameContext)

    useEffect(() => {
        const canvasElement = document.querySelector('canvas')
        const pd = () => {
            gameState[1]("game")
        }
        canvasElement!.addEventListener('pointerdown', pd)
        return () => {
            canvasElement!.removeEventListener('pointerdown', pd)
        }
    }, [gameState])


    const handleClick = () => {
        gameState[1]('game')
    }

    console.log(chosenWords, adjectives, nouns, verbs, adverbs)

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
                {script[0]}
            </Text>
        </Float>
    </>
}
