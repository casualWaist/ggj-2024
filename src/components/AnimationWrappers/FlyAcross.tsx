import {ReactNode, useEffect, useRef} from "react"
import {Group} from "three"
import gsap from "gsap";

export default function FlyAcross({done, children}: {done: () => void, children: ReactNode}) {
    const groupRef = useRef<Group>(null!)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()
            tl.to(groupRef.current.position, {x: -6, duration: 0})
            tl.to(groupRef.current.position, {x: 6, duration: 2, onComplete: done})
        })
        return () => ctx.kill(false)
    }, [])

    return <group ref={groupRef}>
        { children }
    </group>

}
