import { useContext } from "react"
import { Text, Float } from "@react-three/drei"
import { GameContext, script } from "./CaptureWrapper"
import { chosenWords } from "./CaptureWrapper"

let scriptIndex: number
let combinedScript: string


export default function StoryResult( ) {
    const [ gameState, setGameState ] = useContext(GameContext)
    scriptIndex = 0
    combinedScript = ""
    textAppear(0)

    const handleClick = () => {
        scriptIndex++
        textAppear(scriptIndex)
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
                position={[0, 3.5, 0]}
            >
                {combinedScript}
            </Text>
        </Float>
    </>
}    


function textAppear(num: number) {
    let chosenWordIndex: number = 0
    let scripttt: string[] = script[0].split("_____")
    
    for (let index = 0; index < scripttt.length - 1; index++) {
        const element = scripttt[index];
        combinedScript += (element)
        combinedScript += (chosenWords[num][chosenWordIndex].n)
        chosenWordIndex++
    }
    combinedScript += (scripttt[scripttt.length -1])

    console.log(combinedScript)
}
