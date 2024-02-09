import { Text, Float } from "@react-three/drei"
import { script, exampleChosenWords } from "./CaptureWrapper"
import Banana from "./3D/Banana"
import { useState } from "react"

let scriptIndex: number
let combinedScript: string




export default function StoryResult( ) {
    const [needReload, setReload] = useState(false)
    const [banana, setBanana] = useState(false)
    const [bagel, setBagel] = useState(false)

    const reload = () => {
        setReload(true)
    }
    const unload = () => {
        setReload(false)
    }

    scriptIndex = 0
    unload
    textAppear(0)


    const handleClick = () => {
        scriptIndex++
        if(scriptIndex == script.length){
            scriptIndex = 0
        }
        textAppear(scriptIndex)
        reload
        //setGameState((prevState) => ['play', prevState[1]])
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
                { needReload ? combinedScript: combinedScript}
            </Text>
        </Float>
        { banana ? <Banana position={[0,-1,0]} scale={0.6}/>: null }
    </>
}

//adding an ING to a verb
function addING(combinedScript: string): string{
    switch (combinedScript.charAt(combinedScript.length -1)) {
        case 't':
            return "ting"
        case 'e':
            return "-ting"
        default:
            return "ing"
    }
}

//adding an ING to a verb
function pastTense(combinedScript: string): string{
    switch (combinedScript.charAt(combinedScript.length -1)) {
        case 'e':
            return "d"
        default:
            return "ed"
    }
}

function textAppear(num: number) {
    let chosenWordIndex: number = 0
    let scripttt: string[] = script[0].split("_____")
    combinedScript = ""

    for (let index = 0; index < scripttt.length - 1; index++) {
        const element = scripttt[index];
        combinedScript += (element)
        combinedScript += (exampleChosenWords[num][chosenWordIndex]).toLowerCase()
        switch (num) {
            case 0: // 0) present verb
                combinedScript += addING(combinedScript)
                break;
            case 1: // 1) adj, noun, present tense verb
                if(chosenWordIndex == 2){
                    combinedScript += "s"
                }
                break;
            case 2: // 2) verb end in s, verb ending in ing, noun
                if(chosenWordIndex == 0){
                    combinedScript += "s"
                }
                else if (chosenWordIndex == 1){
                    combinedScript += addING(combinedScript)
                }
                break;
            case 3: // 3) adj, noun, past verb, past verb, past verb
                if(chosenWordIndex >= 2){
                    combinedScript += pastTense(combinedScript)
                }
                break;
            case 5: // 5) verb, adj, plural noun
                if(chosenWordIndex == 2){
                    combinedScript += "s"
                }
                break;
            case 6: // 6) present tense verb, adverb, present tense verb, adverb
                if(chosenWordIndex == 0 || chosenWordIndex == 2){
                    combinedScript += "s"
                }
                break;
            case 9: // 9) adj, noun, #2 noun, present tense verb
                if(chosenWordIndex == 3){
                    combinedScript += "s"
                }
                break;
            default:
                break;
        }
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
            nouns.push("MurphyRide")
            nouns.push(exampleChosenWords[num][1])
            break;
        case 2: // 2) verb end in s, verb ending in ing, noun
            nouns.push(exampleChosenWords[num][2])
            break;
        case 3: // 3) adj, noun, past verb, past verb, past verb
            nouns.push(exampleChosenWords[num][1])
            break;
        case 4: // 4) #3 noun, noun
            nouns.push(exampleChosenWords[num][0])
            nouns.push(exampleChosenWords[num][1])
            break;
        case 5: // 5) verb, adj, plural noun
            nouns.push(exampleChosenWords[num][2])
            nouns.push(exampleChosenWords[num][2])
            nouns.push(exampleChosenWords[num][2])
            break;
        case 6: // 6) present tense verb, adverb, present tense verb, adverb
            break;
        case 7: // 7) relationship noun, adj, noun
            nouns.push(exampleChosenWords[num][2])
            break;
        case 8: // 8) verb, #3 noun, adj
            nouns.push(exampleChosenWords[num][1])
            break;
        case 9: // 9) adj, noun, #2 noun, present tense verb
            nouns.push(exampleChosenWords[num][1])
            nouns.push(exampleChosenWords[num][2])
            break;
        default:
            break;
    }
    if(num != 1){
        nouns.push("Murphy")
    }

    console.log(nouns)
    setBanana(false)
    setBagel(false)
    setBananaPeel(false)
    setDonut(false)
    set(false)
    set(false)
    set(false)
    set(false)
    set(false)
    set(false)
    set(false)
    set(false)
    set(false)
    set(false)
    set(false)
    set(false)
    set(false)
    set(false)
    set(false)
    set(false)
    set(false)
    set(false)
    nouns.forEach(noun => {
        switch (noun) {
            case "Banana":
                setBanana(true)
                break;
            case "Banana peel":
                setBananaPeel(true)
                break;
            case "Donut":
                setDonut(true)
                break;
            case "Bagel":
                setBagel(true)
                break;
            case "Crab":
                setCrab(true)
                break;
            case "Monkey":
                setMonkey(true)
                break;
            case "Eye":
                setEye(true)
                break;
            case "Knife":
                setKnife(true)
                break;
            case "Cabbage":
                setCabbage(true)
                break;
            case "Tire":
                setTire(true)
                break;
            case "Fish":
                setFish(true)
                break;
            case "Pasta":
                setPasta(true)
                break;
            case "Fries":
                setFrenchFries(true)
                break;
            case "Hot dog":
                setHotDog(true)
                break;
            case "Burger":
                setBurger(true)
                break;
            case "Soda":
                setSoda(true)
                break;
            case "Bug":
                setBug(true)
                break;
            case "Butter":
                setButter(true)
                break;
            case "Dog":
                setDog(true)
                break;
            case "Cheese":
                setCheese(true)
                break;
            case "Fridge":
                setFridge(true)
                break;
            case "Gummy worm":
                setGummyWorm(true)
                break;
            case "Ice cream":
                setIceCream(true)
                break;
            case "Mug":
                setMug(true)
                break;
            case "Worm":
                setWorm(true)
                break;
            case "Rock":
                setRock(true)
                break;
            case "Scooter":
                setScooter(true)
                break;
            case "Snake":
                setSnake(true)
                break;
            case "Spring":
                setSpring(true)
                break;
            case "Toast":
                setToast(true)
                break;
            case "Fly":
                setFly(true)
                break;
            case "Coffin":
                setCoffin(true)
                break;
            case "Lips":
                setLips(true)
                break;
            case "Forklift":
                setForklift(true)
                break;
            case "Reverse mermaid":
                setReverseMermaid(true)
                break;
            default:
                break;
        }
    });
}
