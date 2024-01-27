import {useEffect, useState, useRef, useContext} from "react"
import {useThree, useFrame} from "@react-three/fiber"
import { GameContext } from "./CaptureWrapper"

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

    return <>
        <mesh ref={boxRef} position={[2, 2, 10]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="hotpink" />
        </mesh>
    </>
}
