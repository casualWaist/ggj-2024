import {useContext, useEffect, useRef} from "react"
import { Text, Float } from "@react-three/drei"
import {GameContext, script, storyPOS} from "./CaptureWrapper"
import gsap from "gsap"
import { Mesh } from "three"

export default function Story() {
    const [ gameState, setGameState ] = useContext(GameContext)
    const textRef = useRef<Mesh>(null!)
    let display = script[gameState.storyIndex]

    function fixTense(word: string, wordIndex: number) {
        const needsPresentTense =
            (gameState.storyIndex === 1  && wordIndex === 2) ||
            (gameState.storyIndex === 2  && wordIndex === 0) ||
            (gameState.storyIndex === 6  && wordIndex === 0) ||
            (gameState.storyIndex === 6  && wordIndex === 2) ||
            (gameState.storyIndex === 9  && wordIndex === 3)
        const needsPastTense =
            (gameState.storyIndex === 3  &&
                (wordIndex === 2) || (wordIndex === 3) || (wordIndex === 4))
        const needsPluralNoun = (gameState.storyIndex === 5 && wordIndex === 2)

        console.log(gameState.storyIndex, gameState.wordIndex)
        if (needsPresentTense) {
            console.log('present tense')
            if (['Smooch', 'Kiss'].includes(word)){
                word += 'es'
            } else {
                word += 's'
            }
        }
        if (needsPastTense) {
            console.log('past tense')
            switch (word) {
                case 'Eat':
                    word = 'Ate'
                    break
                case 'Ride':
                    word = 'Rode'
                    break
                case 'Think':
                    word = 'Thought'
                    break
                case 'Spin':
                    word = 'Spun'
                    break
                case 'Fall':
                    word = 'Fell'
                    break
                case 'Sing':
                    word = 'Sung'
                    break
                default:
                    word += 'ed'
                    break
            }
        }
        if (needsPluralNoun) {
            console.log('plural noun')
            switch (word) {
                case 'Knife':
                    word = 'Knives'
                    break
                case 'French Fries':
                    break
                default:
                    word += 's'
                    break
            }
        }

        return word
    }

    if (gameState.chosen[gameState.storyIndex]) {
        gameState.chosen[gameState.storyIndex].forEach((word, index) => {
            if (!['3/1', '2/2'].includes(storyPOS[gameState.storyIndex][index])) {
                display = display.replace('_____', fixTense(word, index))
            }
        })
    }
    if (display.includes('3/1')) {
        const prevNoun = gameState.chosen[3][1]
        display = display.replace('3/1', prevNoun)
    }
    if (display.includes('2/2')) {
        const prevNoun = gameState.chosen[2][2]
        display = display.replace('2/2', prevNoun)
    }

    const pd = () => {
        setGameState({ section: 'game' })
    }

    console.log(gameState, 'story')

    useEffect(() => {
        if (['game', 'play'].includes(gameState.section)) {
            const tl = gsap.timeline()
            tl.to(textRef.current.position, {y: 2.5, duration: 1})
        } else {
            const tl = gsap.timeline()
            tl.to(textRef.current.position, {y: 0, duration: 1})
        }
    }, [setGameState])

    return <>
        { gameState.section === 'story' ? <mesh onClick={pd} position={[0, 0, 1]}>
            <planeGeometry args={[100, 100, 1, 1]}/>
            <meshStandardMaterial color="gray" transparent opacity={0}/>
        </mesh> : null}
        <Float
            speed={5}
            rotationIntensity={.35}
            floatIntensity={1}>
            <Text
                ref={textRef}
                scale={[0.35, 0.35, 0.35]}
                color="black"
                textAlign="center"
                position={[0, 0, 0]}
            >
                {display}
            </Text>
        </Float>
    </>
}
