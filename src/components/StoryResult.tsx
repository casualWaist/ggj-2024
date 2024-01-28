import { useContext, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Float } from "@react-three/drei"
import { GameContext, chosenWords, script } from "./CaptureWrapper"

let scriptIndex: number

export default function StoryResult( ) {
    scriptIndex = 0

    return <>
        {/*<mesh onClick={handleClick} position={[0, 0, 1]}>
            <planeGeometry args={[100, 10, 1, 1]}/>
            <meshStandardMaterial color="gray" transparent opacity={0}/>
        </mesh>*/}
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
                {textAppear(0)}
            </Text>
        </Float>
    </>
}    
const [ gameState, setGameState ] = useContext(GameContext)


function textAppear(num: number): string {
    let chosenWordIndex: number = 0
    let scripttt: string[] = script[0].split("_____")
    let combinedScript: string = ""
    for (let index = 0; index < scripttt.length - 1; index++) {
        const element = scripttt[index];
        combinedScript += element
        combinedScript += chosenWords[num][chosenWordIndex]
        chosenWordIndex++
    }
    combinedScript += scripttt[scripttt.length -1]
    console.log(combinedScript)
    return combinedScript
}
