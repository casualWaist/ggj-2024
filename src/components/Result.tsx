import {useContext, useRef, useState} from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import Banana from "./3D/Banana"
import Fish from "./3D/Fish"
import FishWithLegs from "./3D/Fishwithlegs"
import Knife from "./3D/Knife"
import Cabbage from "./3D/Cabbage"
import Soda from "./3D/Soda.tsx"
import Fries from "./3D/Fries.tsx"
import Burger from "./3D/Burger.tsx"
import FlyAcross from "./AnimationWrappers/FlyAcross.tsx"
import Shake from "./AnimationWrappers/Shake.tsx"
import {GameContext} from "./CaptureWrapper.tsx";

type resultProps = {
    result0: string[]
    result1: string[]
    result2: string[]
    result3: string[]
    result4: string[]
    result5: string[]
    result6: string[]
    result7: string[]
    result8: string[]
    result9: string[]
}

export default function Result(
    { result0, result1, result2, result3, result4, result5, result6, result7, result8, result9 }: resultProps) {
    const [ act, setAct ] = useState<number>(1)
    const gameState = useContext(GameContext)

    const advance = () => { setAct((prev) => prev + 1) }
    const finish = () => { gameState.count((prev) => ['end', prev[1]]) }

    return <>
        { act === 0 ? <Result0 result={result0} done={advance}/> : null }
        { act === 1 ? <Result1 result={result1} done={advance}/> : null }
        { act === 2 ? <Result2 result={result2} done={advance}/> : null }
        { act === 3 ? <Result3 result={result3} done={advance}/> : null }
        { act === 4 ? <Result4 result={result4} done={advance}/> : null }
        { act === 5 ? <Result5 result={result5} done={advance}/> : null }
        { act === 6 ? <Result6 result={result6} done={advance}/> : null }
        { act === 7 ? <Result7 result={result7} done={advance}/> : null }
        { act === 8 ? <Result8 result={result8} done={advance}/> : null }
        { act === 9 ? <Result9 result={result9} done={finish}/> : null }
    </>
}

function Result0({ result, done }: { result: string[], done: () => void}) {
    console.log(result)
    const burgerRef = useRef<THREE.Group>(null!)

    useFrame((_state, delta,) => {
        burgerRef.current.rotation.y += Math.sin(delta)
    })

    return <FlyAcross done={done}>
        <Burger ref={burgerRef} position={[0, 3, 0]}/>
    </FlyAcross>
}

function Result1({ result, done }: { result: string[], done: () => void}) {
    console.log(result)
    const burgerRef = useRef<THREE.Group>(null!)

    useFrame((_state, delta,) => {
        burgerRef.current.rotation.y += Math.sin(delta)
    })

    return <FlyAcross done={done}>
        <Burger ref={burgerRef} position={[0, 3, 0]}/>
    </FlyAcross>
}

function Result2({ result, done }: { result: string[], done: () => void}) {
    console.log(result)
    const friesRef = useRef<THREE.Group>(null!)

    useFrame((_state, delta,) => {
        friesRef.current.rotation.y += Math.sin(delta)
    })

    return <FlyAcross done={done}>
        <Shake>
            <Fries ref={friesRef} position={[4, 2, 0]}/>
        </Shake>
    </FlyAcross>
}

function Result3({ result, done }: { result: string[], done: () => void}) {
    console.log(result)
    const sodaRef = useRef<THREE.Group>(null!)

    useFrame((_state, delta,) => {
        sodaRef.current.rotation.y += Math.sin(delta)
    })

    return <FlyAcross done={done}>
        <Soda ref={sodaRef} position={[0, 3, 0]}/>
    </FlyAcross>
}

function Result4({ result, done }: { result: string[], done: () => void}) {
    console.log(result)
    const cabbageRef = useRef<THREE.Group>(null!)

    useFrame((_state, delta,) => {
        cabbageRef.current.rotation.y += Math.sin(delta)
    })

    return <FlyAcross done={done}>
        <Cabbage ref={cabbageRef} position={[-3, -3, 0]}/>
    </FlyAcross>
}

function Result5({ result, done }: { result: string[], done: () => void}) {
    console.log(result)
    const fishRef = useRef<THREE.Group>(null!)

    useFrame((_state, delta,) => {
        fishRef.current.rotation.y += Math.sin(delta)
    })

    return <FlyAcross done={done}>
        <Fish ref={fishRef} position={[5, 0, 0]}/>
    </FlyAcross>
}

function Result6({ result, done }: { result: string[], done: () => void}) {
    console.log(result)
    const bananaRef = useRef<THREE.Group>(null!)

    useFrame((_state, delta,) => {
        bananaRef.current.rotation.y += Math.sin(delta)
    })

    return <FlyAcross done={done}>
        <Banana ref={bananaRef} position={[2, 2, 0]}/>
    </FlyAcross>
}

function Result7({ result, done }: { result: string[], done: () => void}) {
    console.log(result)
    const fishLegsRef = useRef<THREE.Group>(null!)

    useFrame((_state, delta,) => {
        fishLegsRef.current.rotation.y += Math.sin(delta)
    })

    return <FlyAcross done={done}>
        <FishWithLegs ref={fishLegsRef} position={[4, -2, 0]}/>
    </FlyAcross>
}

function Result8({ result, done }: { result: string[], done: () => void}) {
    console.log(result)
    const knifeRef = useRef<THREE.Group>(null!)

    useFrame((_state, delta,) => {
        knifeRef.current.rotation.y += Math.sin(delta)
    })

    return <FlyAcross done={done}>
        <Knife ref={knifeRef} position={[0, -4, 0]}/>
    </FlyAcross>
}

function Result9({ result, done }: { result: string[], done: () => void}) {
    console.log(result)
    const knifeRef = useRef<THREE.Group>(null!)

    useFrame((_state, delta,) => {
        knifeRef.current.rotation.y += Math.sin(delta)
    })

    return <FlyAcross done={done}>
        <Knife ref={knifeRef} position={[0, -4, 0]}/>
    </FlyAcross>
}
