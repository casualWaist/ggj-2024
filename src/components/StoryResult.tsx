import { Text, Float } from "@react-three/drei"
import { script } from "./CaptureWrapper"
import { chosenWords } from "./CaptureWrapper"

let scriptIndex: number
let combinedScript: string


export default function StoryResult( ) {
    scriptIndex = 0
    textAppear(0)

    const handleClick = () => {
        scriptIndex++
        if(scriptIndex == script.length){
            scriptIndex = 0
        }
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
    combinedScript = ""

    for (let index = 0; index < scripttt.length - 1; index++) {
        const element = scripttt[index];
        combinedScript += (element)
        combinedScript += (chosenWords[num][chosenWordIndex])
        chosenWordIndex++
    }
    combinedScript += (scripttt[scripttt.length -1])

    console.log(combinedScript)
    nounAppear(num)
}

function nounAppear(num: number) {
    let nouns: string[] = new Array<string>()

    switch (num) {
        case 0: // 0) verb
            break;
        case 1: // 1) adj, noun, present tense verb
            nouns.push("MurphyRide.tsx")
            nouns.push(chosenWords[num][1] + ".tsx")
            break;
        case 2: // 2) verb end in s, verb ending in ing, noun
            nouns.push(chosenWords[num][2] + ".tsx")
            break;
        case 3: // 3) adj, noun, past verb, past verb, past verb
            nouns.push(chosenWords[num][1] + ".tsx")
            break;
        case 4: // 4) #3 noun, noun
            nouns.push(chosenWords[num][0] + ".tsx")
            nouns.push(chosenWords[num][1] + ".tsx")
            break;
        case 5: // 5) verb, adj, plural noun
            nouns.push(chosenWords[num][2] + ".tsx")
            nouns.push(chosenWords[num][2] + ".tsx")
            nouns.push(chosenWords[num][2] + ".tsx")
            break;
        case 6: // 6) present tense verb, adverb, present tense verb, adverb
            break;
        case 7: // 7) relationship noun, adj, noun
            nouns.push(chosenWords[num][2] + ".tsx")
            break;
        case 8: // 8) verb, #3 noun, adj
            nouns.push(chosenWords[num][1] + ".tsx")
            break;
        case 9: // 9) adj, noun, #2 noun, present tense verb
            nouns.push(chosenWords[num][1] + ".tsx")
            nouns.push(chosenWords[num][2] + ".tsx")
            break;
        default:
            break;
    }
    if(num != 1){
        nouns.push("Murphy.tsx")
    }

    console.log(nouns)
    //nouns.forEach(element => {
        
    //});
}