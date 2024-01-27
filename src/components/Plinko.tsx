/*
    This will be the game portion of the project.
    I just set up a very basic plinko board.
    Play with restitution, friction, and gravity to get the desired effect.
*/

import {CapsuleCollider, CuboidCollider, Physics, RapierRigidBody, RigidBody} from "@react-three/rapier"
import {useEffect, useRef, useState} from "react"
import {useFrame, useThree} from "@react-three/fiber";

export default function Plinko() {
    const cubeRef = useRef<RapierRigidBody>(null!)
    const [ go, setGo ] = useState<boolean>(false)
    const accelerate = useRef<boolean>(false)
    const xPos = useRef<number>(0)
    const size = useThree(({size}) => size)

    useEffect(() => {
        const canvasElement = document.querySelector('canvas')
        canvasElement!.addEventListener('pointerdown', (e) => {
            xPos.current = (e.x / size.width) * 4 - 4
            console.log(size.width, e.x, xPos.current)
            setGo(true)
            accelerate.current = true
        })
        canvasElement!.addEventListener('pointerup', () => {
            accelerate.current = false
        })
    }, []);

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

        {/* Boundaries */}
        <RigidBody type="fixed">
            <CuboidCollider position={[0, 0, -1]} args={[4, 4, 0.5]}/>
            <CuboidCollider position={[0, 0, 1]} args={[4, 4, 0.5]}/>
        </RigidBody>

        { go ? <RigidBody mass={25} ref={cubeRef} position={[xPos.current, 5, 0]} friction={0}>
            <mesh>
                <boxGeometry args={[1, 1, 1, 1]}/>
                <meshStandardMaterial color="hotpink"/>
            </mesh>
        </RigidBody> : null }

        <Bumpers n={5}/>

        {/* Floor */}

        <RigidBody type="fixed" position={[0, -4.5, 0]}>
            <mesh>
                <boxGeometry args={[9, 1]} />
                <meshStandardMaterial color="gray"/>
            </mesh>
        </RigidBody>

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
    if (n === 5) return <>
        <Bumper position={[0, 0, 0]}/>
        <Bumper position={[-1.5, -1.5, 0]}/>
        <Bumper position={[1.5, -1.5, 0]}/>
        <Bumper position={[-3, -3.5, 0]}/>
        <Bumper position={[0, -3.5, 0]}/>
        <Bumper position={[3, -3.5, 0]}/>
        <Bumper position={[-4, -1.5, 0]} />
        <Bumper position={[4, -1.5, 0]} />
    </>
    if (n === 4) return <>
        <Bumper position={[0, 0, 0]}/>
        <Bumper position={[-1.5, -1.5, 0]}/>
        <Bumper position={[1.5, -1.5, 0]}/>
        <Bumper position={[-3, -3.5, 0]}/>
        <Bumper position={[0, -3.5, 0]}/>
        <Bumper position={[3, -3.5, 0]}/>
        <Bumper position={[-4, -1.5, 0]} />
        <Bumper position={[4, -1.5, 0]} />
    </>
    if (n === 3) return <>
        <Bumper position={[0, 0, 0]}/>
        <Bumper position={[-1.5, -1.5, 0]}/>
        <Bumper position={[1.5, -1.5, 0]}/>
        <Bumper position={[-3, -3.5, 0]}/>
        <Bumper position={[0, -3.5, 0]}/>
        <Bumper position={[3, -3.5, 0]}/>
        <Bumper position={[-4, -1.5, 0]} />
        <Bumper position={[4, -1.5, 0]} />
    </>
}
