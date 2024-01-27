import {CapsuleCollider, CuboidCollider, Physics, RapierRigidBody, RigidBody} from "@react-three/rapier"
import {useEffect, useRef} from "react"

export default function Plinko() {
    const cubeRef = useRef<RapierRigidBody>(null!)

    useEffect(() => {
        setTimeout(() =>{
            cubeRef.current.applyTorqueImpulse({x: 0, y: 0, z: 0.5}, true)
        }, 100)
    }, []);

    return <Physics debug gravity={[0, -1, 0]}>

        {/* Boundaries */}
        <RigidBody type="fixed">
            <CuboidCollider position={[0, 0, -1]} args={[4, 4, 0.5]}/>
            <CuboidCollider position={[0, 0, 1]} args={[4, 4, 0.5]}/>
        </RigidBody>

        <RigidBody mass={20} ref={cubeRef} position={[0, 5, 0]} friction={0}>
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
            <capsuleGeometry args={[0.5, 1, 4, 8]}/>
            <meshStandardMaterial color="hotpink"/>
        </mesh>
        <CapsuleCollider args={[1, 0.5]}/>
    </RigidBody>
}
