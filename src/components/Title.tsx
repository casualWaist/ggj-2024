import {Float, Torus} from "@react-three/drei"
import {useEffect, useRef} from "react"
import gsap from "gsap"

export default function Title() {
    const titleRef = useRef<THREE.Mesh>(null!)
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()
            tl.to(titleRef.current.position, {y: 0, duration: 1})
        })
        return () => ctx.kill(false)
    }, [])
    
    return <Float><Torus ref={titleRef} args={[1, 0.5, 16, 100]} position={[0, 5, 0]} rotation={[0, 0, 0]}/></Float>
}
