/*
    This will be the game portion of the project.
    I just set up a very basic plinko board.
    Play with restitution, friction, and gravity to get the desired effect.
*/
import {
    CapsuleCollider,
    CollisionEnterHandler,
    CollisionPayload,
    CuboidCollider,
    IntersectionEnterPayload,
    Physics,
    RapierRigidBody,
    RigidBody
} from "@react-three/rapier"
import { useContext, useEffect, useRef, useState } from "react"
import { ThreeEvent, useFrame } from "@react-three/fiber"
import { Float, Text } from "@react-three/drei"
import { GameContext } from "./CaptureWrapper"
import { randomWords } from "./Story.tsx"


// Choose random number
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;



export default function Plinko() {
    const [gameState] = useContext(GameContext)
    const cubeRef = useRef<RapierRigidBody>(null!)
    const [ go, setGo ] = useState<boolean>(false)
    //const accelerate = useRef<boolean>(false)
    const xPos = useRef<number>(0)
    let singleClick = true


    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        if (singleClick && e.uv) { xPos.current = e.point.x }
        setGo(true)
    }

    //useEffect(() => {
    //    const canvasElement = document.querySelector('canvas')
    //    const pd = () => {
    //        accelerate.current = true
    //    }
    //    const pu = () => {
    //        accelerate.current = false
    //    }
    //    canvasElement!.addEventListener('pointerdown', pd)
    //    canvasElement!.addEventListener('pointerup', pu)
    //    return () => {
    //        canvasElement!.removeEventListener('pointerdown', pd)
    //        canvasElement!.removeEventListener('pointerup', pu)
    //    }
    //}, [])

    //useFrame(() => {
    //    if (go && accelerate.current) {
    //        cubeRef.current.applyImpulse({x: 0, y: -0.3, z: 0}, true)
    //    }
    //})

    /*
        The Physics Engine is Rapier, which is a port of PhysX to Rust.
        Debug mode is enabled, so you can see the physics bodies.
    */
    return <Physics debug gravity={[0, -10, 0]}>

        { go ? null :<mesh onPointerDown={handleClick}>
            <planeGeometry args={[100, 10, 1, 1]}/>
            <meshStandardMaterial color="gray" transparent opacity={0}/>
        </mesh> }

        {/* Front and Back Boundaries */}
        <RigidBody type="fixed">
            <CuboidCollider position={[0, 0, -1.1]} args={[4, 4, 0.5]}/>
            <CuboidCollider position={[0, 0, 1.1]} args={[4, 4, 0.5]}/>
        </RigidBody>

        {/* CUBE */}
        { go ? <RigidBody mass={25} ref={cubeRef} position={[xPos.current, 4, 0]} friction={0}>
            <mesh>
                <boxGeometry args={[1, 1, 1, 1]}/>
                <meshStandardMaterial color="hotpink"/>
            </mesh>
        </RigidBody> : null }

        <Bumpers n={3}/>

        <Surfaces words={gameState.wordsDisplayed}/>

    </Physics>
}


function Bumper({position}: {position: [number, number, number]}) {
    const soundEffect = useRef<HTMLAudioElement>(null!)
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

    const handleSoundCollision = () => {
        soundNum.current = randomInt(1, 5) as 1 | 2 | 3 | 4 | 5
        soundEffect.current.play()
    }

    return <RigidBody onCollisionEnter={handleSoundCollision}
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


const handleIntersection = (e: IntersectionEnterPayload, gameState: any, setGameState: any) => {
    //soundNum.current = randomInt(1, 4) as 1 | 2 | 3 | 4
    //soundEffect.current.play()
    console.log("collision", gameState)

    let chooseMe = e.target.rigidBody?.userData as string

    setGameState(prevState => ({ index: prevState.index + 1 }))

    if (gameState.index == gameState.vocab.length) {
        setGameState(prevState => ({ chosen: [...prevState.chosen, chooseMe] }))
        if (gameState.count < 9) { setGameState((prevState) => ({ section: 'story', count: prevState.count + 1 })) }
        else { setGameState((prevState) => ({ section: 'play', count: prevState.count })) }
    }
    else {
        //Need to reset plinko here, unsure about how.
        //1) delete cube, cube starts at top again
        randomWords(gameState.index, setGameState, gameState.vocab, gameState.chosen)
    }
}

function Surfaces({words}: {words: string[]}) {
    const  [ gameState, setGameState]  = useContext(GameContext)
    console.log(gameState)
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

        {/* FLOOR */}
        {/* floor 1 */}
        <RigidBody sensor
                   onIntersectionEnter={e => handleIntersection(e, gameState, setGameState)}
                   userData={{n: words[0]}}
                   type="fixed"
                   position={[0, -4.5, 0]}
                   gravityScale={0}>
            <mesh>
                <boxGeometry args={[4, 1, 1]} />
                <meshStandardMaterial color="gray"/>
            </mesh>
        </RigidBody>
        <Float speed={5}
               rotationIntensity={.15}
               floatIntensity={0.5}
        >
        <Text
        fontSize={0.5}
        position={[0, -3.5, 0]}>

            {words[0]}
        </Text>
        </Float>
        {/* floor 2 */}
        <RigidBody
                   sensor
                   onIntersectionEnter={e => handleIntersection(e, gameState, setGameState)}
                   userData={{n: words[1]}}
                   type="fixed"
                   position={[-3, -4.5, 0]}
                   gravityScale={0}>
            <mesh>
                <boxGeometry args={[4, 1, 1]} />
                <meshStandardMaterial color="gray"/>
            </mesh>
        </RigidBody>
        <Float speed={5}
               rotationIntensity={.15}
               floatIntensity={0.5}
        >
            <Text
            fontSize={0.5}
            position={[-3, -3.5, 0]}>

                {words[1]}
            </Text>
        </Float>
        {/* floor 3 */}
        <RigidBody
                   sensor
                   onIntersectionEnter={e => handleIntersection(e, gameState, setGameState)}
                   userData={{n: words[2]}}
                   type="fixed"
                   position={[3, -4.5, 0]}
                   gravityScale={0}>
            <mesh>
                <boxGeometry args={[4, 1, 1]} />
                <meshStandardMaterial color="gray"/>
            </mesh>
        </RigidBody>
        <Float speed={5}
               rotationIntensity={.15}
               floatIntensity={0.5}
        >
            <Text
                fontSize={0.5}
                position={[3, -3.5, 0]}>

                {words[2]}
            </Text>
        </Float>
    </>
}
