import { useContext } from "react"
import { Text, Float } from "@react-three/drei"
import { GameContext, script, adjectives, nouns, verbs, adverbs, relations } from "./CaptureWrapper"

export default function Story() {
    const [ gameState, setGameState ] = useContext(GameContext)

    setGameState({ index: 0, chosen: [] })

    const handleClick = () => {
        let words: string[]
        switch (gameState.count) {
            case 0:
                words = ["verb"]
                break;
            case 1:
                words = ["adj", "noun", "verb"]
                break;
            case 2:
                words = ["verb", "verb", "noun"]
                break;
            case 3:
                words = ["adj", "noun", "verb", "verb", "verb"]
                break;
            case 4:
                words = ["3/2", "noun"]
                break;
            case 5:
                words = ["verb", "adj", "noun"]
                break;
            case 6:
                words = ["verb", "adverb", "verb", "adverb"]
                break;
            case 7:
                words = ["relation", "adj", "noun"]
                break;
            case 8:
                words = ["verb", "3/2", "adj"]
                break;
            case 9:
                words = ["adj", "noun", "2/3", "verb"]
                break;
            default:
                words = ["error"]
                break;
        }
        randomWords(gameState.index, setGameState, words, gameState.chosen)
        setGameState((prevState) => ({ section: 'game', count: prevState.count, vocab: words }))
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
                {script[gameState.count]}
            </Text>
        </Float>
    </>
}


const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

//RANDOM WORDS
export function randomWords(index, setGameState, vocab, chosenWords) {
    let len: number = 3
    let arr: string[] = nouns
    let flag = false
    const threeRandoms: string[] = new Array<string>();
    let indeces: string[] = []

    switch (vocab[index]) {
        case "adj":
        case "adjective":
            len = adjectives.length
            arr = adjectives
            break;
        case "noun":
            len = nouns.length
            arr = nouns
            break;
        case "adverb":
            len = adverbs.length
            arr = adverbs
            break;
        case "verb":
            len = verbs.length
            arr = verbs
            break;
        case "relation":
            len = relations.length
            arr = relations
            break;
        case "error":
            threeRandoms.push("ERROR")
            flag = true
            break;
        default:
            indeces = vocab[index].split("/")
            threeRandoms.push( chosenWords[+indeces[0] -1][+indeces[1] -1] )
            flag = true
            break;
    }

    //why does it only do two sometimes???
    let num: number = randomInt(0, len)
    while(threeRandoms.length < 3) {
        //making sure It's not already a chosenWord
        for (let i = 0; i < chosenWords.length; i++) {
            for (let j = 0; j < chosenWords[i].length; j++) {
                const element = chosenWords[i][j];
                if(arr[num] === element){
                    flag = true
                }
            }
        }
        if(!flag){
            threeRandoms.push(arr[num])
        }
        num = randomInt(0, len)
    }
    if(threeRandoms.length < 3){
        threeRandoms.push(arr[randomInt(0, len)])
    }

    setGameState({ wordsDisplayed: threeRandoms })
}
