/*
    This is an example of a component that uses the three fiber and gsap animation hooks.
*/

import {useEffect, useRef} from "react"
import {useFrame} from "@react-three/fiber"
import * as THREE from "three"
import gsap from "gsap"
import Banana from "./Banana.tsx";

export default function AniCube() {
    const bananaRef = useRef<THREE.Mesh>(null!)

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
    })

    return <>
        {/* @ts-expect-error/hard */}
        <Banana ref={bananaRef} position={[2, 2, 0]}/>
    </>
}
