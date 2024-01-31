/*
    This will be the game portion of the project.
    I just set up a very basic plinko board.
    Play with restitution, friction, and gravity to get the desired effect.
*/

import {
    CapsuleCollider,
    CuboidCollider,
    IntersectionEnterPayload,
    Physics,
    RapierRigidBody,
    RigidBody
} from "@react-three/rapier"
import {useContext, useEffect, useMemo, useRef, useState} from "react"
import {ThreeEvent, useFrame, useThree} from "@react-three/fiber"
import {GameContext, storyPOS, GameState, nouns, adjectives, adverbs, verbs, relations } from "./CaptureWrapper"
import {Float, Text} from "@react-three/drei"

export default function Plinko() {
    const cubeRef = useRef<RapierRigidBody>(null!)
    const [ go, setGo ] = useState<boolean>(false)
    const accelerate = useRef<boolean>(false)
    const xPos = useRef<number>(0)

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        if (e.uv) { xPos.current = e.point.x }
        setGo(true)
    }

    const passSetGo = () => { setGo((prevState) => !prevState) }

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

    useFrame(() => {
        if (go && accelerate.current) {
            cubeRef.current.applyImpulse({x: 0, y: -0.3, z: 0}, true)
        }
    })

    return <Physics debug gravity={[0, -1, 0]}>

        { go ? null :<mesh onPointerDown={handleClick} position={[0, 0, -1]}>
            <planeGeometry args={[10, 10, 1, 1]}/>
            <meshStandardMaterial color="gray" transparent opacity={0}/>
        </mesh> }

        {/* Boundaries */}
        <RigidBody type="fixed">
            <CuboidCollider position={[0, 0, -1]} args={[4, 4, 0.5]}/>
            <CuboidCollider position={[0, 0, 1]} args={[4, 4, 0.5]}/>
        </RigidBody>

        { go ? <RigidBody mass={25} ref={cubeRef} position={[xPos.current, 4, 0]} friction={0}>
            <mesh>
                <boxGeometry args={[1, 1, 1, 1]}/>
                <meshStandardMaterial color="hotpink"/>
            </mesh>
        </RigidBody> : null }

        <Bumpers reset={passSetGo}/>

    </Physics>
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



function Bumpers({reset}: {reset: () => void}) {
    const [ gameState, setGameState]  = useContext(GameContext)
    const sectionWords = useRef([])

    function hasBeenChosen(word: string | undefined, chosenWords: string[][]) {
        if (!word) return true
        let flag = false
        for (let i = 0; i < chosenWords.length; i++) {
            for (let j = 0; j < chosenWords[i].length; j++) {
                const element = chosenWords[i][j];
                if(word === element){
                    flag = true
                }
            }
        }
        console.log(word, flag, 'flag')
        return flag
    }

    function randomWords(posArray: string[], index: number, chosenWords: string[][]) {
        console.log(posArray, index, chosenWords, 'random')
        const len: number = Math.floor(Math.random() * 3) + 3
        const words: string[] = []
        const pos = posArray[index]
        for (let i = 0; i < len; i++) {
            let word: string | undefined = undefined
            let rounds = 0
            while (hasBeenChosen(word, chosenWords)) {
                switch (pos) {
                    case "adj":
                    case "adjective":
                        if (rounds > 30) {
                            word = adjectives.find((w) => !hasBeenChosen(w, chosenWords))
                        } else {
                            word = adjectives[Math.floor(Math.random() * adjectives.length)]
                        }
                        break;
                    case "noun":
                        if (rounds > 30) {
                            word = nouns.find((w) => !hasBeenChosen(w, chosenWords))
                        } else {
                            word = nouns[Math.floor(Math.random() * nouns.length)]
                        }
                        break;
                    case "adverb":
                        if (rounds > 30) {
                            word = adverbs.find((w) => !hasBeenChosen(w, chosenWords))
                        } else {
                            word = adverbs[Math.floor(Math.random() * adverbs.length)]
                        }
                        break;
                    case "verb":
                        if (rounds > 30) {
                            word = verbs.find((w) => !hasBeenChosen(w, chosenWords))
                        } else {
                            word = verbs[Math.floor(Math.random() * verbs.length)]
                        }
                        break;
                    case "relation":
                        if (rounds > 30) {
                            word = relations.find((w) => !hasBeenChosen(w, chosenWords))
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
                words.push(word!)
                rounds++
            }
        }
        return words
    }

    useEffect(() => {
        if (['2/3', '3/2'].includes(gameState.vocab[gameState.wordIndex])) {
            const indices = gameState.vocab[gameState.wordIndex].split("/").map((w) => parseInt(w))
            setGameState((prevState: GameState) => {
                const prevChosen = [ ...prevState.chosen ]
                prevChosen.push([prevState.chosen[indices[0]][indices[1]]])
                let newIndex = prevState.wordIndex + 1
                let newStoryIndex = prevState.storyIndex
                if (newIndex === prevState.vocab.length) {
                    newIndex = 0
                    newIndex += 1
                }
                return { chosen: prevChosen, wordIndex: newIndex, storyIndex: newStoryIndex }
            })
        }
    }, [gameState])

    const wordChoices = useMemo(
        () => randomWords(storyPOS[gameState.storyIndex], gameState.wordIndex, gameState.chosen),
        [gameState])
    console.log(wordChoices, sectionWords.current, gameState.chosen)

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

        <Surfaces words={wordChoices} sectionWords={sectionWords.current} reset={reset}/>

    </>
}

function FloorSensor({word, pos, width, handleCollision}: {
    word: string, pos: [number, number, number], width: number, handleCollision: (e: IntersectionEnterPayload) => void}) {
    console.log('floor', pos)
    return <>
        <RigidBody sensor
                  onIntersectionEnter={handleCollision}
                  userData={{word: word}}
                  type="fixed"
                  position={pos}>
            <mesh>
                <boxGeometry args={[width, 1]} />
                <meshStandardMaterial color="gray"/>
            </mesh>
        </RigidBody>
        <Float speed={5}
               rotationIntensity={.15}
               floatIntensity={0.5}>
            <Text
                fontSize={0.5}
                position={[pos[0], pos[1] + 1, pos[2]]}>
                {word}
            </Text>
        </Float>
    </>
}

function Surfaces({words, sectionWords, reset}: {words: string[], sectionWords: string[], reset: () => void}) {
    const  [ gameState, setGameState]  = useContext(GameContext)
    const view = useThree((state) => state.viewport)
    const num = words.length
    const floorWidth = view.width / num
    const floorXs: number[] = []
    for (let i = 0; i < num; i++) {
        const platformX = (i + 0.5) * floorWidth - view.width / 2;
        floorXs.push(platformX)
    }


    const handleCollision = (e: IntersectionEnterPayload) => {
        // @ts-expect-error/don't know how to set userData type
        sectionWords.current.push(e.target.rigidBody?.userData.word)
        console.log('inersection')
        const readyToAdvance = storyPOS[gameState.storyIndex].length === sectionWords.length
        console.log(readyToAdvance, 'ready')
        if (readyToAdvance) {
            setGameState((prevState: GameState) => {
                const prevChosen = [ ...prevState.chosen ]
                prevChosen.push(sectionWords)
                const newIndex = prevState.storyIndex + 1
                return { chosen: prevChosen, storyIndex: newIndex, wordIndex: 0 }
            })
        } else {
            reset()
        }
    }

    return <>
        {/* Left Wall */}
        <RigidBody type='fixed' position={[-5, 0, 0]}>
            <mesh>
                <boxGeometry args={[1, 9]} />
                <meshBasicMaterial color="gray" />
            </mesh>
        </RigidBody>

        {/* Right Wall */}
        <RigidBody type='fixed' position={[5, 0, 0]}>
            <mesh>
                <boxGeometry args={[1, 9]} />
                <meshBasicMaterial color="gray" />
            </mesh>
        </RigidBody>

        {/* Ceiling */}
        <RigidBody type='fixed' position={[0, 5, 0]} rotation={[0, 0, Math.PI * 0.5]}>
            <mesh>
                <boxGeometry args={[1, 9]} />
                <meshBasicMaterial color="gray" />
            </mesh>
        </RigidBody>

        {/* Floor */}
        <FloorSensor word={words[0]}
                     pos={[floorXs[0], -4.5, 0]}
                     width={floorWidth}
                     handleCollision={handleCollision} />

        {/* floor 2 */}
        <FloorSensor word={words[1]}
                     pos={[floorXs[1], -4.5, 0]}
                     width={floorWidth}
                     handleCollision={handleCollision} />

        {/* floor 3 */}
        <FloorSensor word={words[2]}
                     pos={[floorXs[2], -4.5, 0]}
                     width={floorWidth}
                     handleCollision={handleCollision} />

        {/* floor 4 */}
        { num > 3 ? <FloorSensor word={words[3]}
                      pos={[floorXs[3], -4.5, 0]}
                      width={floorWidth}
                      handleCollision={handleCollision}/> : null}

        {/* floor 5 */}
        { num > 4 ? <FloorSensor word={words[4]}
                      pos={[floorXs[4], -4.5, 0]}
                      width={floorWidth}
                      handleCollision={handleCollision}/> : null}

    </>
}
