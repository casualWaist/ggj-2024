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
import { useContext, useEffect, useRef, useState } from "react"
import { ThreeEvent, useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import { GameContext, chosenWords, adjectives, nouns, verbs, adverbs, relations } from "./CaptureWrapper"
import { vocab } from "../App.tsx"

//for choosing words
let index: number
let vocabLength: number
let words = new Array<string>();

export default function Plinko() {
    const cubeRef = useRef<RapierRigidBody>(null!)
    const [ go, setGo ] = useState<boolean>(false)
    const accelerate = useRef<boolean>(false)
    const xPos = useRef<number>(0)

    index = 0
    vocabLength = vocab.length

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        if (e.uv) { xPos.current = e.point.x }
        setGo(true)
    }

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

    /*
        The Physics Engine is Rapier, which is a port of PhysX to Rust.
        Debug mode is enabled, so you can see the physics bodies.
    */
    return <Physics debug gravity={[0, -1, 0]}>

        { go ? null :<mesh onPointerDown={handleClick}>
            <planeGeometry args={[100, 10, 1, 1]}/>
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

        <Bumpers n={3}/>

        <Surfaces n={3} words={randomWords()}/>

    </Physics>
}

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

//RANDOM WORDS
function randomWords(): string[] {
    let len: number = 3
    let arr: string[] = nouns
    let flag = false
    let threeRandoms: string[] = []
    
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
            let indeces = vocab[index].split("/")
            threeRandoms.push( chosenWords[+indeces[0] -1][+indeces[1] -1] )
            flag = true
            break;
    }

    let num: number = randomInt(0, len)
    while(threeRandoms.length < 3) {
        //making sure its not already a chosenWord
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
    return threeRandoms
}

function choose(word: string) {
    const setGameState  = useContext(GameContext)

    words.push(word)
    index += 1;
    if (index == vocabLength) {
        chosenWords.push(words)
        words = [""]
        setGameState[1]('story')
    }
    else {
        //Need to reset plinko here, unsure about how.
        //1) delete cube, cube starts at top again
    }
}


function Bumper({position}: {position: [number, number, number]}) {
    const soundEffect = useRef<HTMLAudioElement>(null!)
    const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    const soundNum = useRef<1 | 2 | 3 | 4 | 5>(randomInt(1, 5) as 1 | 2 | 3 | 4 | 5)

    useEffect(() => {
        switch (soundNum.current) {
            case 1:
                soundEffect.current = new Audio('/ColliderBounce_01.wav')
                break;
            case 2:
                soundEffect.current = new Audio('/ColliderBounce_02.wav')
                break;
            case 3:
                soundEffect.current = new Audio('/ColliderBounce_03.wav')
                break;
            case 4:
                soundEffect.current = new Audio('/ColliderBounce_04.wav')
                break;
            case 5:
                soundEffect.current = new Audio('/ColliderBounce_05.wav')
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

function Bumpers({n}: {n: 3 | 4 | 5}) {

    if (n === 3) {
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
}

function Surfaces({n, words}: {n: 3 | 4 | 5, words: string[]}) {
    const  [ gameState, setGameState]  = useContext(GameContext)

    const handleCollision = (e: IntersectionEnterPayload) => {
        //// TODO: do word array mutation and check for completion

        ///* @ts-expect-error/n not part of type*/
        //chosenWords.push([e.target.rigidBody?.userData.n])

        //let allWordsForPart = 0

        //if (chosenWords.length > 0) { allWordsForPart = 1 }

        //if ( gameState[1] < 9) { setGameState((prevState) => ['story', prevState[1] + allWordsForPart]) }
        //else { setGameState((prevState) => ['play', prevState[1]]) }
        console.log(e, e.target.rigidBody?.userData)
        choose(e.target.rigidBody?.userData as string)
    }

    if (n === 3) {
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
            <RigidBody sensor
                       onIntersectionEnter={handleCollision}
                       userData={{n: words[0]}}
                       type="fixed"
                       position={[0, -4.5, 0]}>
                <mesh>
                    <boxGeometry args={[3, 1]} />
                    <meshStandardMaterial color="gray"/>
                </mesh>       
            </RigidBody>
            <RigidBody sensor
                       onIntersectionEnter={handleCollision}
                       userData={{n: words[1]}}
                       type="fixed"
                       position={[-3, -4.5, 0]}>
                <mesh>
                    <boxGeometry args={[3, 1]} />
                    <meshStandardMaterial color="gray"/>
                </mesh>
            </RigidBody>
            <RigidBody sensor
                       onIntersectionEnter={handleCollision}
                       userData={{n: words[2]}}
                       type="fixed"
                       position={[3, -4.5, 0]}>
                <mesh>
                    <boxGeometry args={[3, 1]} />
                    <meshStandardMaterial color="gray"/>
                </mesh>
            </RigidBody>
        </>
    }
}
