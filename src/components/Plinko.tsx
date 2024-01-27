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
import {useContext, useRef, useState} from "react"
import {ThreeEvent, useFrame} from "@react-three/fiber"
import {GameContext} from "./CaptureWrapper.tsx";

export default function Plinko() {
    const cubeRef = useRef<RapierRigidBody>(null!)
    const [ go, setGo ] = useState<boolean>(false)
    const accelerate = useRef<boolean>(false)
    const xPos = useRef<number>(0)

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        console.log(e)
        if (e.uv) { xPos.current = e.point.x }
        setGo(true)
    }

    useFrame(() => {
        if (go && accelerate.current) {
            cubeRef.current.applyImpulse({x: 0, y: -0.1, z: 0}, true)
        }
    })

    /*
        The Physics Engine is Rapier, which is a port of PhysX to Rust.
        Debug mode is enabled, so you can see the physics bodies.
    */
    return <Physics debug gravity={[0, -1, 0]}>

        { go ? null :<mesh onClick={handleClick}>
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

        <Surfaces n={3} words={['banana', 'doughnut', 'hotdog']}/>

    </Physics>
}

function Bumper({position}: {position: [number, number, number]}) {
    return <RigidBody position={position}
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
    const  setGameState  = useContext(GameContext)

    const handleCollision = (e: IntersectionEnterPayload) => {
        console.log(e, e.target.rigidBody?.userData)
        setGameState[1]('end')
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
