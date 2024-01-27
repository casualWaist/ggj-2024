import {useEffect, useRef} from "react"
import {useFrame} from "@react-three/fiber"
import * as THREE from "three"
import gsap from "gsap"

export default function AniCube() {
    const boxRef = useRef<THREE.Mesh>(null!)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()
            tl.to(boxRef.current.position, {z: 0, duration: 1})
            tl.to(boxRef.current.position, {x: -5, duration: 5})
        })
        return () => ctx.kill(false)
    }, [])

    useFrame((_state, delta,) => {
        boxRef.current.rotation.z += Math.sin(delta)
    })

    return <>
        <mesh ref={boxRef} position={[2, 2, 10]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="hotpink" />
        </mesh>
    </>
}
