/*
    This will be the game portion of the project.
    I just set up a very basic plinko board.
    Play with restitution, friction, and gravity to get the desired effect.
*/

import {CapsuleCollider, CuboidCollider, Physics, RapierRigidBody, RigidBody} from "@react-three/rapier"
import {useEffect, useRef} from "react"

export default function Plinko() {
    const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) ) + min
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
    return <Physics debug gravity={[0, -5, 0]}>

        {/* Boundaries */}
        <RigidBody type="fixed">
            <CuboidCollider position={[0, 0, -1]} args={[4, 4, 0.5]}/>
            <CuboidCollider position={[0, 0, 1]} args={[4, 4, 0.5]}/>
        </RigidBody>

        <RigidBody mass={25} ref={cubeRef} position={[randomNumber(-3.85, 3.85), 5, 0]} friction={0}>
            <mesh>
                <boxGeometry args={[1, 1, 1, 1]}/>
                <meshStandardMaterial color="hotpink"/>
            </mesh>
        </RigidBody>

        <Bumpers n={3}/>

        <Surfaces n={3}/>

    </Physics>
}

// function ChooseWord() {
//     return 
// }

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

function Surfaces({n}: {n: 3 | 4 | 5}) {
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
            {/* Floor */}
            <RigidBody type="fixed" position={[0, -4.5, 0]}>
                <mesh>
                    <boxGeometry args={[3, 1]} />
                    <meshStandardMaterial color="gray"/>
                </mesh>
            </RigidBody>
            <RigidBody type="fixed" position={[-3, -4.5, 0]}>
                <mesh>
                    <boxGeometry args={[3, 1]} />
                    <meshStandardMaterial color="gray"/>
                </mesh>
            </RigidBody>
            <RigidBody type="fixed" position={[3, -4.5, 0]}>
                <mesh>
                    <boxGeometry args={[3, 1]} />
                    <meshStandardMaterial color="gray"/>
                </mesh>
            </RigidBody>
        </>
    }
}