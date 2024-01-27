/*
    This will be the game portion of the project.
    I just set up a very basic plinko board.
    Play with restitution, friction, and gravity to get the desired effect.
*/

import {CapsuleCollider, CuboidCollider, Physics, RapierRigidBody, RigidBody} from "@react-three/rapier"
import {useEffect, useRef} from "react"

export default function Plinko() {
    const randomNumber = Math.floor(Math.random() * 5) + 1
    const cubeRef = useRef<RapierRigidBody>(null!)

    useEffect(() => {
        setTimeout(() =>{
            cubeRef.current.applyTorqueImpulse({x: 0, y: 0, z: 0.5}, true)
        }, 100)
    }, []);


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

        <RigidBody mass={25} ref={cubeRef} position={[randomNumber, 5, 0]} friction={0}>
            <mesh>
                <boxGeometry args={[1, 1, 1, 1]}/>
                <meshStandardMaterial color="hotpink"/>
            </mesh>
        </RigidBody>

        <Bumper position={[0, 0, 0]}/>
        <Bumper position={[-1.5, -1.5, 0]}/>
        <Bumper position={[1.5, -1.5, 0]}/>
        <Bumper position={[-3, -3.5, 0]}/>
        <Bumper position={[0, -3.5, 0]}/>
        <Bumper position={[3, -3.5, 0]}/>
        <Bumper position={[-4, -1.5, 0]} />
        <Bumper position={[4, -1.5, 0]} />

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