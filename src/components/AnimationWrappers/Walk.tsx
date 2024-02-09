import {forwardRef, ReactNode, useEffect, useImperativeHandle, useRef} from "react"
import {Group} from "three"
import gsap from "gsap";

type Props = {
    go: boolean,
    stepTime?: number,
    children: ReactNode
} & JSX.IntrinsicElements['group']

const Walk = forwardRef(({go, stepTime = 0.2, children, ...props}: Props, ref) => {
    const groupRef = useRef<Group>(null!)

    useImperativeHandle(ref, () => ({ group: groupRef.current }))

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (go) {
                const tl = gsap.timeline({repeat: -1})
                tl.to(groupRef.current.position, {y: '+=0.5', duration: stepTime})
                tl.to(groupRef.current.rotation, {y: Math.PI * 0.25, z: Math.PI * 0.125, duration: stepTime}, '<')
                tl.to(groupRef.current.position, {y: '-=0.5', duration: stepTime})
                tl.to(groupRef.current.rotation, {y: -Math.PI * 0.25, z: -Math.PI * 0.125, duration: stepTime}, '<')
            }
        })
        return () => ctx.kill(false)
    }, [go])

    return <group ref={groupRef} {...props}>
        { children }
    </group>
})

export default Walk
