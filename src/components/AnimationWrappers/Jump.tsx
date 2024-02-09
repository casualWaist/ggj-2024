import {forwardRef, ReactNode, useEffect, useImperativeHandle, useRef} from "react"
import {Group} from "three"
import gsap from "gsap";

type Props = {
    go: boolean,
    speed?: number,
    axis?: 'x' | 'y' | 'z',
    rAxis?: 'x' | 'y' | 'z',
    angle?: number,
    height?: number,
    children: ReactNode
} & JSX.IntrinsicElements['group']

const Jump = forwardRef(
    ({go,
        speed = 0.2,
        angle = 0,
        axis = 'y',
        rAxis = 'x',
        height = 2,
        children,
        ...props}: Props, ref) => {
    const groupRef = useRef<Group>(null!)

    useImperativeHandle(ref, () => ({ group: groupRef.current }))

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (go) {
                const tl = gsap.timeline({repeat: -1})
                tl.to(groupRef.current.position, {[axis]: `+=${height}`, duration: speed})
                tl.to(groupRef.current.rotation, {[rAxis]: angle, duration: speed}, '<')
                tl.to(groupRef.current.position, {[axis]: `-=${height}`, duration: speed})
                tl.to(groupRef.current.rotation, {[rAxis]: -angle, duration: speed}, '<')
            }
        })
        return () => ctx.kill(false)
    }, [go])

    return <group ref={groupRef} {...props}>
        { children }
    </group>
})

export default Jump
