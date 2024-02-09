import {forwardRef, ReactNode, useEffect, useImperativeHandle, useRef} from "react"
import {Group} from "three"
import gsap from "gsap"
import * as THREE from "three"

type Props = {
    go: boolean,
    repeat?: boolean,
    ret?: boolean,
    angle?: number,
    axis?: 'x' | 'y' | 'z',
    duration?: number,
    children: ReactNode
} & JSX.IntrinsicElements['group']

const Roll = forwardRef(
    ({
        go,
        repeat = true,
        ret = false,
        angle = Math.PI * 2,
        duration = 0.5,
        axis = 'x',
        children,
        ...props
    }: Props, ref) => {
    const groupRef = useRef<Group>(null!)
    const subGroupRef = useRef<Group>(null!)

    useImperativeHandle(ref, () => ({ group: groupRef.current }))

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (go) {
                const box = new THREE.Box3().setFromObject(subGroupRef.current)
                const bounds = box.getSize(new THREE.Vector3())
                groupRef.current.position.y += bounds.y * 0.5
                subGroupRef.current.position.y -= bounds.y * 0.5
                const tl = gsap.timeline({repeat: repeat ? -1 : 0})
                tl.to(groupRef.current.rotation, {
                    [axis]: repeat ? angle : angle * duration,
                    duration: duration,
                    ease: ret ? 'power2.inOut' : 'none'
                })
                if (ret) {
                    tl.to(groupRef.current.rotation, {
                        [axis]: 0,
                        duration: duration,
                        ease: ret ? 'power2.inOut' : 'none'
                    })
                }
            }
        })
        return () => ctx.kill(false)
    }, [go])

    return <group ref={groupRef} {...props}>
        <group ref={subGroupRef}>
            {children}
        </group>
    </group>
})

export default Roll
