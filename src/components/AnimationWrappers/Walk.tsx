import {ReactNode, useEffect, useRef} from "react"
import {Group} from "three"
import gsap from "gsap";

export default function Walk({done, children}: {done: () => void, children: ReactNode}) {
    const groupRef = useRef<Group>(null!)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({repeat: -1})
            tl.to(groupRef.current.rotation, {z: -Math.PI * 2, duration: 0})
        })
        return () => ctx.kill(false)
    }, [])

    return <group ref={groupRef}>
        { children }
    </group>
}