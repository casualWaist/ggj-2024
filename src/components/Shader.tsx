/*
    Example of a shader component. Custom glsl shaders have to be imported as strings.
    The shaderMaterial function from drei is used to create a shader material.
    The shaderMaterial function takes in a uniform object, a vertex shader, and a fragment shader.
    The uniform object is used to pass in values to the shaders.
    This all just wrapping to use a custom shader in a react-three-fiber component.
*/


import {shaderMaterial} from "@react-three/drei"
import * as THREE from "three"
// @ts-expect-error/vite import problem
import vertex from '../shaders/vertex.glsl'
// @ts-expect-error/vite import problem
import fragment from '../shaders/fragment.glsl'
import {extend, MaterialNode, useFrame} from "@react-three/fiber"
import {forwardRef, useImperativeHandle, useRef} from "react"

const MarchReps = shaderMaterial({
        time: 0,
        // this ternary is necessary because SSR
        resolution: typeof window !== 'undefined' ? new THREE.Vector2(window.innerWidth, window.innerHeight) : new THREE.Vector2(1, 1),
    },
    vertex,
    fragment,
)

type Props = THREE.ShaderMaterial & { time?: number, resolution?: THREE.Vector2 }
extend({ MarchReps })
declare module "@react-three/fiber" {
    interface ThreeElements {
        marchReps: MaterialNode<Props, typeof MarchReps>;
    }
}

export const Shader = forwardRef(({ ...props }: Props, ref) => {
    const localRef = useRef<THREE.ShaderMaterial & {time: number, resolution?: THREE.Vector2}>(null!)

    useImperativeHandle(ref, () => localRef.current)

    useFrame((_, delta) => (localRef.current.time += delta))
    return <marchReps key={MarchReps.key} ref={localRef} {...props} attach='material' />
})
Shader.displayName = 'Shader'
