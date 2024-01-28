import {ReactNode, useEffect, useRef} from "react"
import {Group} from "three"
import gsap from "gsap";

export default function Shake({children}: {children: ReactNode}) {
    const groupRef = useRef<Group>(null!)

    useEffect(() => {
        const x = groupRef.current.position.x
        const y = groupRef.current.position.y
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1 })
            tl.to(groupRef.current.position, {
                x: 0.1 + x,
                y: 0.2 * 0.25 + y,
                duration: Math.random() * 0.125
            })
            tl.to(groupRef.current.position, {
                x: -0.3 + x,
                y: 0.1 + y,
                duration: Math.random() * 0.125
            })
            tl.to(groupRef.current.position, {
                x: 0.2 + x,
                y: -0.1 + y,
                duration: 0.125
            })
        })
        return () => ctx.kill(false)
    }, [])

    return <group ref={groupRef}>
        { children }
    </group>

}
