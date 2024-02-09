import {
    CapsuleCollider,
    CuboidCollider,
    IntersectionEnterPayload,
    Physics,
    RapierRigidBody,
    RigidBody
} from "@react-three/rapier"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import {ThreeEvent, useFrame, useThree} from "@react-three/fiber"
import {GameContext, storyPOS, GameState, nouns, adjectives, adverbs, verbs, relations } from "./CaptureWrapper"
import {Float, Text} from "@react-three/drei"

export default function Plinko() {
    const  [ gameState, setGameState]  = useContext(GameContext)
    const sectionWords = useRef<string[]>([])

    function hasBeenChosen(word: string | undefined, words: string[], chosenWords: string[][]) {
        if (!word) return true
        if (words.includes(word)) return true
        let flag = false
        for (let i = 0; i < chosenWords.length; i++) {
            for (let j = 0; j < chosenWords[i].length; j++) {
                const element = chosenWords[i][j];
                if(word === element){
                    flag = true
                }
            }
        }
        return flag
    }

    function randomWords(pOSArray: string[], index: number, chosenWords: string[][]) {
        const len: number = Math.floor(Math.random() * 3) + 3
        const words: string[] = []
        const pOS = pOSArray[index]
        if (['2/2', '3/1'].includes(pOS)) return []

        for (let i = 0; i < len; i++) {
            let word: string | undefined = undefined
            let rounds = 0
            while (hasBeenChosen(word, words, chosenWords)) {
                switch (pOS) {
                    case "adj":
                    case "adjective":
                        if (rounds > 30) {
                            word = adjectives.find((w) => !hasBeenChosen(w, words, chosenWords))
                        } else {
                            word = adjectives[Math.floor(Math.random() * adjectives.length)]
                        }
                        break;
                    case "noun":
                        if (rounds > 30) {
                            word = nouns.find((w) => !hasBeenChosen(w, words, chosenWords))
                        } else {
                            word = nouns[Math.floor(Math.random() * nouns.length)]
                        }
                        break;
                    case "adverb":
                        if (rounds > 30) {
                            word = adverbs.find((w) => !hasBeenChosen(w, words, chosenWords))
                        } else {
                            word = adverbs[Math.floor(Math.random() * adverbs.length)]
                        }
                        break;
                    case "verb":
                        if (rounds > 30) {
                            word = verbs.find((w) => !hasBeenChosen(w, words, chosenWords))
                        } else {
                            word = verbs[Math.floor(Math.random() * verbs.length)]
                        }
                        break;
                    case "relation":
                        if (rounds > 30) {
                            word = relations.find((w) => !hasBeenChosen(w, words, chosenWords))
                        } else {
                            word = relations[Math.floor(Math.random() * relations.length)]
                        }
                        break;
                    case "error":
                        word = 'error'
                        break;
                    default:
                        word = 'default'
                        break;
                }
                rounds++
            }
            words.push(word!)
        }
        return words
    }

    useEffect(() => {
        if (['2/2', '3/1'].includes(storyPOS[gameState.storyIndex][gameState.wordIndex])) {
            const indices = storyPOS[gameState.storyIndex][gameState.wordIndex].split("/").map((w) => parseInt(w))
            sectionWords.current.push(gameState.chosen[indices[0]][indices[1]])
            setGameState((prevState: GameState) => {
                const prevChosen = [ ...prevState.chosen ]
                if (prevState.wordIndex === 0) {
                    prevChosen.push([gameState.chosen[indices[0]][indices[1]]])
                } else {
                    prevChosen[prevState.storyIndex][prevState.wordIndex] = gameState.chosen[indices[0]][indices[1]]
                }
                let newIndex = prevState.wordIndex + 1
                let newStoryIndex = prevState.storyIndex
                if (newIndex === storyPOS[prevState.storyIndex].length) {
                    newIndex = 0
                    newStoryIndex += 1
                }
                return { chosen: prevChosen, wordIndex: newIndex, storyIndex: newStoryIndex }
            })
        }
    }, [gameState])

    const wordChoices = useMemo(
        () => {
            return randomWords(storyPOS[gameState.storyIndex], gameState.wordIndex, gameState.chosen)
        },
        [gameState])
    const num = wordChoices.length

    const handleCollision = (e: IntersectionEnterPayload) => {
        // @ts-expect-error/don't know how to set userData type
        const word = e.target.rigidBody?.userData.word

        sectionWords.current.push(word)
        const readyToAdvance = storyPOS[gameState.storyIndex].length === sectionWords.current.length
        setGameState((prevState: GameState) => {
            const prevChosen = [ ...prevState.chosen ]
            if (prevState.wordIndex === 0) {
                prevChosen.push([word])
            } else {
                prevChosen[prevState.storyIndex][prevState.wordIndex] = word
            }
            if (readyToAdvance) {
                const newIndex = prevState.storyIndex + 1 < storyPOS.length ?  prevState.storyIndex + 1 : 0
                const newSection = newIndex === 0 ? 'play' : 'story'
                return { section: newSection, chosen: prevChosen, storyIndex: newIndex, wordIndex: 0 }
            } else {
                return { ...prevState, chosen: prevChosen, wordIndex: prevState.wordIndex + 1 }
            }
        })

    }

    return <Physics gravity={[0, -1, 0]}>

        <Layout
            handleCollision={handleCollision}
            num={num}
            wordChoices={wordChoices} />
        <Barriers />

    </Physics>
}

function Layout ({wordChoices, num, handleCollision}: {
    wordChoices: string[], num: number, handleCollision: (e: IntersectionEnterPayload) => void
}) {

    return <>

        { num === 3 ? <BumpersForThree /> : null }
        { num === 4 ? <BumpersForFour /> : null }
        { num === 5 ? <BumpersForFive /> : null }

        { num === 3 ? <SensorsForThree wordChoices={wordChoices} handleCollision={handleCollision} /> : null }
        { num === 4 ? <SensorsForFour wordChoices={wordChoices} handleCollision={handleCollision} /> : null }
        { num === 5 ? <SensorsForFive wordChoices={wordChoices} handleCollision={handleCollision} /> : null }

        <DropObj />
    </>
}

function SensorsForThree({wordChoices, handleCollision}: {
    wordChoices: string[], handleCollision: (e: IntersectionEnterPayload) => void
}) {
    const num = wordChoices.length
    const view = useThree((state) => state.viewport)
    const floorWidth = (view.width / num) * 0.8
    const floorXs: number[] = []
    for (let i = 0; i < num; i++) {
        const platformX = (i + 0.5) * (view.width / num) - view.width / 2
        floorXs.push(platformX)
    }

    return <>
        <FloorSensor word={wordChoices[0]}
                     pos={[floorXs[0], -4, 0]}
                     width={floorWidth}
                     handleCollision={handleCollision} />
        <FloorSensor word={wordChoices[1]}
                     pos={[floorXs[1], -4, 0]}
                     width={floorWidth}
                     handleCollision={handleCollision} />
        <FloorSensor word={wordChoices[2]}
                     pos={[floorXs[2], -4, 0]}
                     width={floorWidth}
                     handleCollision={handleCollision} />
    </>
}

function SensorsForFour({wordChoices, handleCollision}: {
    wordChoices: string[], handleCollision: (e: IntersectionEnterPayload) => void
}) {
    const num = wordChoices.length
    const view = useThree((state) => state.viewport)
    const floorWidth = (view.width / num) * 0.8
    const floorXs: number[] = []
    for (let i = 0; i < num; i++) {
        const platformX = (i + 0.5) * (view.width / num) - view.width / 2
        floorXs.push(platformX)
    }
    return <>
        <FloorSensor word={wordChoices[0]}
                     pos={[floorXs[0], -4, 0]}
                     width={floorWidth}
                     handleCollision={handleCollision} />
        <FloorSensor word={wordChoices[1]}
                     pos={[floorXs[1], -4, 0]}
                     width={floorWidth}
                     handleCollision={handleCollision} />
        <FloorSensor word={wordChoices[2]}
                     pos={[floorXs[2], -4, 0]}
                     width={floorWidth}
                     handleCollision={handleCollision} />
        <FloorSensor word={wordChoices[3]}
                     pos={[floorXs[3], -4, 0]}
                     width={floorWidth}
                     handleCollision={handleCollision}/>
    </>
}

function SensorsForFive({wordChoices, handleCollision}: {
    wordChoices: string[], handleCollision: (e: IntersectionEnterPayload) => void
}) {
    const num = wordChoices.length
    const view = useThree((state) => state.viewport)
    const floorWidth = (view.width / num) * 0.8
    const floorXs: number[] = []
    for (let i = 0; i < num; i++) {
        const platformX = (i + 0.5) * (view.width / num) - view.width / 2
        floorXs.push(platformX)
    }

    return <>
        <FloorSensor word={wordChoices[0]}
                     pos={[floorXs[0], -4, 0]}
                     width={floorWidth}
                     handleCollision={handleCollision} />
        <FloorSensor word={wordChoices[1]}
                     pos={[floorXs[1], -4, 0]}
                     width={floorWidth}
                     handleCollision={handleCollision} />
        <FloorSensor word={wordChoices[2]}
                     pos={[floorXs[2], -4, 0]}
                     width={floorWidth}
                     handleCollision={handleCollision} />
        <FloorSensor word={wordChoices[3]}
                     pos={[floorXs[3], -4, 0]}
                     width={floorWidth}
                     handleCollision={handleCollision}/>
        <FloorSensor word={wordChoices[4]}
                     pos={[floorXs[4], -4, 0]}
                     width={floorWidth}
                     handleCollision={handleCollision}/>
    </>
}

function DropObj() {
    const [ gameState] = useContext(GameContext)
    const [ go, setGo ] = useState<boolean>(false)
    const count = useRef({story: 0, word: 0})
    const xyPos = useRef<{x: number, y: number}>({x: 0, y: 0})
    const cubeRef = useRef<RapierRigidBody>(null!)
    const accelerate = useRef<boolean>(false)

    useEffect(() => {
        const canvasElement = document.querySelector('canvas')
        const pd = () => {
            accelerate.current = true
        }
        const pu = () => {
            accelerate.current = false
        }
        canvasElement!.addEventListener('pointerdown', pd)
        canvasElement!.addEventListener('pointerup', pu)
        return () => {
            canvasElement!.removeEventListener('pointerdown', pd)
            canvasElement!.removeEventListener('pointerup', pu)
        }
    }, [])

    useEffect(() => {
        if (gameState.wordIndex !== count.current.word){
            count.current.word = gameState.wordIndex
            if (gameState.storyIndex !== count.current.story){
                count.current.story = gameState.storyIndex
            }
            setGo(false)
        }
    }, [gameState])

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        if (e.uv) { xyPos.current = {x: e.point.x, y: 4 }}
        setGo(true)
    }

    useFrame(() => {
        if (go && accelerate.current) {
            cubeRef.current.applyImpulse({x: 0, y: -0.3, z: 0}, true)
        }
    })
    return <>
        { go ? null :<mesh onPointerDown={handleClick} position={[0, 0, -1]}>
            <planeGeometry args={[10, 10, 1, 1]}/>
            <meshStandardMaterial color="gray" transparent depthWrite={false} opacity={0}/>
        </mesh> }

        { go ? <RigidBody mass={25} ref={cubeRef} position={[xyPos.current.x, xyPos.current.y, 0]} friction={0}>
            <mesh>
                <boxGeometry args={[1, 1, 1, 1]}/>
                <meshStandardMaterial color="hotpink"/>
            </mesh>
        </RigidBody> : null }
    </>
}

function BumpersForThree() {
    return <>
        {/* 1st row */}
        <Bumper position={[-2.5, 1.5, 0]} />
        <Bumper position={[2.5, 1.5, 0]} />
        {/* 2st row */}
        {/* <Bumper position={[-3, 0, 0]} /> */}
        <Bumper position={[0, 0, 0]} />
        {/* <Bumper position={[3, 0, 0]} /> */}
        {/* 3nd row */}
        <Bumper position={[-1.5, -1.5, 0]} />
        <Bumper position={[1.5, -1.5, 0]} />
        <Bumper position={[-4, -1.5, 0]} />
        <Bumper position={[4, -1.5, 0]} />
        {/* bottom row */}
        <Bumper position={[-1.5, -3.5, 0]} />
        <Bumper position={[1.5, -3.5, 0]} />
    </>
}

function BumpersForFour() {
    return <>
        {/* 1st row */}
        <Bumper position={[-2.5, 1.5, 0]} />
        <Bumper position={[2.5, 1.5, 0]} />
        {/* 2st row */}
        {/* <Bumper position={[-3, 0, 0]} /> */}
        <Bumper position={[0, 0, 0]} />
        {/* <Bumper position={[3, 0, 0]} /> */}
        {/* 3nd row */}
        <Bumper position={[-1.5, -1.5, 0]} />
        <Bumper position={[1.5, -1.5, 0]} />
        <Bumper position={[-4, -1.5, 0]} />
        <Bumper position={[4, -1.5, 0]} />
        {/* bottom row */}
        <Bumper position={[-2.5, -3.5, 0]} />
        <Bumper position={[0, -3.5, 0]} />
        <Bumper position={[2.5, -3.5, 0]} />
    </>
}

function BumpersForFive() {
    return <>
        {/* 1st row */}
        <Bumper position={[-2.5, 1.5, 0]} />
        <Bumper position={[2.5, 1.5, 0]} />
        {/* 2st row */}
        {/* <Bumper position={[-3, 0, 0]} /> */}
        <Bumper position={[0, 0, 0]} />
        {/* <Bumper position={[3, 0, 0]} /> */}
        {/* 3nd row */}
        <Bumper position={[-1.5, -1.5, 0]} />
        <Bumper position={[1.5, -1.5, 0]} />
        <Bumper position={[-4, -1.5, 0]} />
        <Bumper position={[4, -1.5, 0]} />
        {/* bottom row */}
        <Bumper position={[-2.75, -3.5, 0]} />
        <Bumper position={[1, -3.5, 0]} />
        <Bumper position={[-1, -3.5, 0]} />
        <Bumper position={[2.75, -3.5, 0]} />
    </>
}

function Bumper({position}: {position: [number, number, number]}) {
    const soundEffect = useRef<HTMLAudioElement>(null!)
    const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    const soundNum = useRef<1 | 2 | 3 | 4 | 5>(randomInt(1, 5) as 1 | 2 | 3 | 4 | 5)

    useEffect(() => {
        switch (soundNum.current) {
            case 1:
                soundEffect.current = new Audio('/SFX/ColliderBounce_01.wav')
                break;
            case 2:
                soundEffect.current = new Audio('/SFX/ColliderBounce_02.wav')
                break;
            case 3:
                soundEffect.current = new Audio('/SFX/ColliderBounce_03.wav')
                break;
            case 4:
                soundEffect.current = new Audio('/SFX/ColliderBounce_04.wav')
                break;
            case 5:
                soundEffect.current = new Audio('/SFX/ColliderBounce_05.wav')
                break;
        }

    },[])

    const handleCollision = () => {
        soundNum.current = randomInt(1, 5) as 1 | 2 | 3 | 4 | 5
        soundEffect.current.play()
    }

    return <RigidBody onCollisionEnter={handleCollision}
                      position={position}
                      rotation={[-Math.PI * 0.5, 0, 0]}
                      friction={0}
                      restitution={2}
                      type="fixed"
                      colliders={false}>
        <mesh>
            <capsuleGeometry args={[0.2, 1, 4, 8]}/>
            <meshStandardMaterial color="hotpink"/>
        </mesh>
        <CapsuleCollider args={[0.8, 0.2]}/>
    </RigidBody>
}

function FloorSensor({word, pos, width, handleCollision}: {
    word: string, pos: [number, number, number], width: number, handleCollision: (e: IntersectionEnterPayload) => void}) {

    return <>
        <RigidBody sensor
                   onIntersectionEnter={handleCollision}
                   userData={{word: word}}
                   type="fixed"
                   position={pos}>
            <mesh>
                <boxGeometry args={[width, 0.125]} />
                <meshStandardMaterial color="gray" transparent opacity={0}/>
            </mesh>
        </RigidBody>
        <Float speed={5}
               rotationIntensity={.15}
               floatIntensity={0.5}>
            <Text
                fontSize={0.5}
                color={'white'}
                position={[pos[0], pos[1] + 0.5, 1]}>
                {word}
            </Text>
        </Float>
    </>
}

function Barriers() {

    return <>
        {/* Front and Back Walls */}
        <RigidBody type="fixed">
            <CuboidCollider position={[0, 0, -1]} args={[4, 4, 0.5]}/>
            <CuboidCollider position={[0, 0, 1]} args={[4, 4, 0.5]}/>
        </RigidBody>

        {/* Left Wall */}
        <RigidBody type='fixed' position={[-5, 0, 0]}>
            <mesh>
                <boxGeometry args={[1, 9]}/>
                <meshStandardMaterial color="gray" transparent opacity={0}/>
            </mesh>
        </RigidBody>

        {/* Right Wall */}
        <RigidBody type='fixed' position={[5, 0, 0]}>
            <mesh>
                <boxGeometry args={[1, 9]}/>
                <meshStandardMaterial color="gray" transparent opacity={0}/>
            </mesh>
        </RigidBody>

        {/* Ceiling */}
        <RigidBody type='fixed' position={[0, 5, 0]} rotation={[0, 0, Math.PI * 0.5]}>
            <mesh>
                <boxGeometry args={[1, 9]}/>
                <meshStandardMaterial color="gray" transparent opacity={0}/>
            </mesh>
        </RigidBody>

    </>
}
