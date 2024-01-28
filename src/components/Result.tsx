/*
    This is an example of a component that uses the three fiber and gsap animation hooks.
*/
import { chosenWords } from "./CaptureWrapper.tsx"
import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import gsap from "gsap"
import Banana from "./3D/Banana.tsx"
import Fish from "./3D/Fish.tsx"
import FishWithLegs from "./3D/Fishwithlegs.tsx"
import Knife from "./3D/Knife.tsx"
import Cabbage from "./3D/Cabbage.tsx"
import { script } from "./CaptureWrapper.tsx"

export default function AniCube() {
    const bananaRef = useRef<THREE.Mesh>(null!)
    const fishRef = useRef<THREE.Group>(null!)
    const fishLegsRef = useRef<THREE.Group>(null!)
    const cabbageRef = useRef<THREE.Group>(null!)
    const knifeRef = useRef<THREE.Group>(null!)

    /*
        useEffect is used to set up the animation. The function is called on mount.
        The second argument is an array of dependencies. If the dependencies change, the function is called again.
        In this case, the function is only called on mount because the array is empty.
        The return value is a cleanup function that is called on unmount.
     */
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()
            tl.to(bananaRef.current.position, {z: 0, duration: 1})
            tl.to(bananaRef.current.position, {x: -5, duration: 5})
        })
        return () => ctx.kill(false)
    }, [])

    /*
        useFrame is a hook from three fiber that is called every frame.
        This is a more traditional tick animation
        the .current is a react thing. It is used to access the current value of a reference
    */

    useFrame((_state, delta,) => {
        bananaRef.current.rotation.z += Math.sin(delta)
        fishRef.current.rotation.y += Math.sin(delta)
        fishLegsRef.current.rotation.y += Math.sin(delta)
        knifeRef.current.rotation.y += Math.sin(delta)
        cabbageRef.current.rotation.y += Math.sin(delta)
    })

    return <>
        {/* @ts-expect-error/hard */}
        <Banana ref={bananaRef} position={[2, 2, 0]}/>
        <Fish ref={fishRef} position={[5, 0, 0]}/>
        <FishWithLegs ref={fishLegsRef} position={[4, -2, 0]}/>
        <Knife ref={knifeRef} position={[0, -2, 0]}/>
        <Cabbage ref={cabbageRef} position={[-3, -3, 0]}/>
    </>
}