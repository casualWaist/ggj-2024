import {forwardRef, useEffect, useImperativeHandle, useRef} from "react"
import * as THREE from "three"
import gsap from "gsap"
import Noun from "../Noun.tsx"
import {Group} from "three";

type Props = {
    ride: string
    children: React.ReactNode
}

const MurphsRide = forwardRef<Group, Props>(({ ride, children }: { ride: string, children: React.ReactNode }, ref) => {
    const nounRef = useRef<THREE.Group>(null!)
    const rideRef = useRef<THREE.Group>(null!)

    const rideHeight = () => {
        const box = new THREE.Box3().setFromObject(nounRef.current)
        const bounds = box.getSize(new THREE.Vector3())
        return  bounds.y
    }

    useImperativeHandle<Group, any>(ref, () => ({ rideHeight: rideHeight }))

    useEffect(() => {
        console.log(nounRef.current, 'nounRef')
        const offY = rideHeight()
        nounRef.current.position.y -= offY
        rideRef.current.position.y += offY
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()
            tl.to(rideRef.current.position, {x: 35, z: 21.129, duration: 2.5})
            tl.to(nounRef.current.rotation, {z: Math.PI * 0.125, duration: 1, delay: 2})
        })
        return () => ctx.kill(false)
    }, [])

    return <group ref={rideRef} position={[90, 0.757, 20]} rotation={[0, -Math.PI * 0.5, 0]}>
        { children }
        <Noun noun={ride} ref={nounRef}/>
    </group>
})

export default MurphsRide
