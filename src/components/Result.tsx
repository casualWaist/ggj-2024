import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import gsap from "gsap"
import Banana from "./3D/Banana"
import Fish from "./3D/Fish"
import FishWithLegs from "./3D/Fishwithlegs"
import Knife from "./3D/Knife"
import Cabbage from "./3D/Cabbage"
import Soda from "./3D/Soda.tsx"
import Fries from "./3D/Fries.tsx"
import Burger from "./3D/Burger.tsx";
import FlyAcross from "./AnimationWrappers/FlyAcross.tsx";
import Shake from "./AnimationWrappers/Shake.tsx";

export default function AniCube() {
    const bananaRef = useRef<THREE.Group>(null!)
    const fishRef = useRef<THREE.Group>(null!)
    const fishLegsRef = useRef<THREE.Group>(null!)
    const cabbageRef = useRef<THREE.Group>(null!)
    const knifeRef = useRef<THREE.Group>(null!)
    const sodaRef = useRef<THREE.Group>(null!)
    const friesRef = useRef<THREE.Group>(null!)
    const burgerRef = useRef<THREE.Group>(null!)

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
        sodaRef.current.rotation.y += Math.sin(delta)
        friesRef.current.rotation.y += Math.sin(delta)
        burgerRef.current.rotation.y += Math.sin(delta)
    })

    return <>
        <Banana ref={bananaRef} position={[2, 2, 0]}/>
        <Fish ref={fishRef} position={[5, 0, 0]}/>
        <FishWithLegs ref={fishLegsRef} position={[4, -2, 0]}/>
        <Knife ref={knifeRef} position={[0, -4, 0]}/>
        <Cabbage ref={cabbageRef} position={[-3, -3, 0]}/>
        <Soda ref={sodaRef} position={[2, -2, 0]} />
        <Shake>
            <Fries ref={friesRef} position={[4, 2, 0]}/>
        </Shake>
        <FlyAcross>
            <Burger ref={burgerRef} position={[0, 3, 0]}/>
        </FlyAcross>
    </>
}
