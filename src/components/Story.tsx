import {useContext, useEffect, useRef} from "react"
import {Text, Float, Stars, Hud, PerspectiveCamera} from "@react-three/drei"
import {GameContext, script, storyPOS} from "./CaptureWrapper"
import gsap from "gsap"
import {Group, Mesh} from "three"
import WaffleHouseExt from "./3D/WaffleHouseExt.tsx"
import {useFrame} from "@react-three/fiber"

export default function Story() {
    const [ gameState, setGameState ] = useContext(GameContext)
    const textRef = useRef<Mesh>(null!)
    const wfRef = useRef<Group>(null!)
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
                case 'Fries':
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
            if (gameState.section === 'game'){
                const tlWH = gsap.timeline()
                tlWH.to(wfRef.current.position, {y: -120, duration: 1})
            }
        } else {
            const tl = gsap.timeline()
            tl.to(textRef.current.position, {y: 1, duration: 1})
            if (gameState.section === 'story') {
                const tlWH = gsap.timeline()
                tlWH.to(wfRef.current.position, {y: -30, duration: 1})
            }
        }
    }, [setGameState])

    useFrame((_, delta) => {
        if (gameState.section === 'story') {
            wfRef.current.rotation.y += delta * 0.25
        }
    })

    return <>
        { gameState.section === 'story' ? <mesh onClick={pd} position={[0, 0, 1]}>
            <planeGeometry args={[100, 100, 1, 1]}/>
            <meshStandardMaterial color="gray" transparent opacity={0}/>
        </mesh> : null}
        <Hud>
            <Float
                speed={5}
                rotationIntensity={.35}
                floatIntensity={1}>
                <Text
                    ref={textRef}
                    scale={0.35}
                    color="white"
                    textAlign="center"
                    outlineWidth={0.1}
                    lineHeight={1}
                    position={[0, 1, 0]}>
                    {display}
                </Text>
            </Float>
            <PerspectiveCamera makeDefault position={[0, 0, 10]}/>
        </Hud>
        <Stars depth={500} count={10000} factor={8}/>
        { ['story', 'game'].includes(gameState.section) ?
            <WaffleHouseExt ref={wfRef}
                         position={[-20, -150, -120]}
                         rotation={[Math.PI * 0.05, -Math.PI * 0.5, 0]}/> : null }
    </>
}
