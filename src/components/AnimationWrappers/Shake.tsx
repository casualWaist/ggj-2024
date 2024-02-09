import {forwardRef, ReactNode, useImperativeHandle, useRef} from "react"
import {Group, Vector3} from "three"
import {useFrame} from "@react-three/fiber";

type Props = {
    go: boolean,
    violence?: number,
    duration?: number,
    repeat?: boolean,
    children: ReactNode
} & JSX.IntrinsicElements['group']

const Shake = forwardRef(
    ({go, violence = 1, repeat = true, duration = 1, children, ...props}: Props, ref) => {
    const groupRef = useRef<Group>(null!)
    const subGroupRef = useRef<Group>(null!)

    useImperativeHandle(ref, () => ({ group: groupRef.current }))
    let dur = Math.random() * 0.1
    let x = 0
    let toPoint = new Vector3(
        (Math.random() - 0.5) * violence,
        (Math.random() - 0.5) * violence,
        (Math.random() - 0.5) * violence
    )

    useFrame((_, delta) => {
        if (go && duration > x) {
            if (dur <= 0) {
                toPoint = new Vector3(
                    (Math.random() - 0.5) * violence,
                    (Math.random() - 0.5) * violence,
                    (Math.random() - 0.5) * violence
                )
                dur = Math.random() * 0.1
            }
            subGroupRef.current.position.lerp(toPoint, 1 - dur)
            dur -= delta
            if (!repeat) x += delta
        }
    })

    return <group ref={groupRef} {...props}>
        <group ref={subGroupRef}>
            {children}
        </group>
    </group>
})

export default Shake
