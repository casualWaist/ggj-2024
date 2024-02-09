import {Canvas, useFrame, useThree} from "@react-three/fiber"
import WaffleHouseExt from "./3D/WaffleHouseExt.tsx";
import { useRef} from "react";
//import gsap from "gsap";
import {Group} from "three";
import {OrbitControls} from "@react-three/drei";

export default function Test(){

    return <Canvas style={{width: '700px', height: '80%'}}>
        <Scene />
    </Canvas>
}

function Scene(){
    const camera = useThree((state) => state.camera as THREE.PerspectiveCamera)
    const whRef = useRef<Group>(null!)
    /*
        under the sign position = [88.36, 0.757, 59.979]
        parking spot position = [29.191, 0.757, 21.129]
        rounding corner position = [20.885, 0.757, 34.31]
        out of door position = [0.618, 0.757, 33.895]
        inside position = [0.204, 1.605, 24.915]
        murphy stool position = [-5.296, 7.527, 6.662]
        mLeft stool position = [-5.304, 7.527, 13.450]
        mRight stool position = [-5.372, 7.527, 0.34]
        murphy meal position = [-10.268, 8.691, 6.481]
        mLeft meal position = [-10.273, 8.691, 13.55]
        ride off position = [-495.579, 0.757, 697.208]
    */

    let t = 0
    useFrame((_, delta) => {
        if (t > 1){
            console.log(camera.position, camera)
            t = 0
        }
        t += delta
    })


    return <>
        <WaffleHouseExt ref={whRef} onClick={(e) => {
            console.log(e.point.x, e.point.y, e.point.z)}}/>
        <OrbitControls />
    </>
}


/*
    const [ act, setAct ] = useState(8)
    useEffect(() => {
        switch (act) {
            case 0:
                camera.position.set(110, 110, 55)
                camera.rotation.set(1.3181585540207559, 0.5987764248651162, -1.1412948357403145)
                const tl0 = gsap.timeline()
                tl0.to(camera.position, {x: 110, y: 10, z: 55, duration: 3})
                tl0.to(camera.position, { duration: 3, onComplete: () => { setAct(1) }})
                break
            case 1:
                camera.position.set(-3.310, 32.704, 47.069)
                camera.rotation.set( -0.4615, -0.6347, -0.2867)
                const tl1 = gsap.timeline()
                tl1.to(camera.position, {x: 4, y: 32.704, z: 47.069, duration: 4})
                tl1.to(camera.position, { duration: 1, onComplete: () => { setAct(2) }})
                break
            case 2:
                camera.position.set(41.069, 15.995, -11.151)
                camera.rotation.set(-2.9204, 0.3972, 3.0548)
                const tl2 = gsap.timeline()
                tl2.to(camera.position, {x: 40.069, y: 15.995, z: -10.151, duration: 4})
                tl2.to(camera.position, { duration: 1, onComplete: () => { setAct(3) }})
                break
            case 3:
                camera.position.set(-14.121, 13.639, 11.079)
                camera.rotation.set(-0.2873, -0.8311, -0.2483)
                const tl3 = gsap.timeline()
                tl3.to(camera.rotation, {y: -1.5311, duration: 1, delay: 2})
                tl3.to(camera.position, {z: 11.479, duration: 4}, '<')
                tl3.to(camera.position, { duration: 1, onComplete: () => { setAct(4) }})
                break
            case 4:
                camera.position.set(-14.704, 9.978, -2.595)
                camera.rotation.set(-3.0684, -0.7459, -3.0919)
                const tl4 = gsap.timeline()
                tl4.to(camera.position, {z: -1.595, duration: 3})
                tl4.to(camera.position, { duration: 2, onComplete: () => { setAct(5) }})
                break
            case 5:
                camera.position.set(-13.306, 15.056, 9.51)
                camera.rotation.set(-1.6227, -0.9755, -1.6335)
                const tl5 = gsap.timeline()
                tl5.to(camera, {fov: 90, duration: 3, onUpdate: () => { camera.updateProjectionMatrix() }})
                tl5.to(camera.position, { duration: 2, onComplete: () => { setAct(6) }})
                break
            case 6:
                camera.position.set(-8.371, 9.563, 3.769)
                camera.rotation.set(-2.9410, -0.7640, -3.0018)
                camera.fov = 90
                camera.updateProjectionMatrix()
                const tl6 = gsap.timeline()
                tl6.to(camera.rotation, {x: -3.5, duration: 3})
                tl6.to(camera.position, { duration: 2, onComplete: () => { setAct(7) }})
                break
            case 7:
                camera.position.set(-14.323, 14.581, 8.908)
                camera.rotation.set(-0.6245, -1.0171, -0.5500)
                camera.fov = 75
                camera.updateProjectionMatrix()
                const tl7 = gsap.timeline()
                tl7.to(camera.position, {y: 19.581, duration: 0.1, delay: 2})
                tl7.to(camera.position, {y: 14.581, duration: 0.1})
                tl7.to(camera.position, { duration: 2, onComplete: () => { setAct(8) }})
                break
            case 8:
                camera.position.set(24.419, 14.267, 53.902)
                camera.rotation.set(-0.1908, 0.6508, 0.1165)
                camera.fov = 60
                camera.updateProjectionMatrix()
                const tl8 = gsap.timeline()
                tl8.to(camera, {fov: 80, duration: 3, delay: 1, onUpdate: () => { camera.updateProjectionMatrix() }})
                tl8.to(camera.position, { duration: 1, onComplete: () => { setAct(9) }})
                break
            case 9:
                camera.position.set(-12.491, 12.667, 37.620)
                camera.rotation.set(-0.3619, -0.6321, -0.2200)
                const tl9 = gsap.timeline()
                tl9.to(camera.position, {x: 13.2913, y: 14.0414, z: 57.290, duration: 4, delay: 1})
                tl9.to(camera.rotation, {y: Math.PI, duration: 1})
                tl9.to(camera.position, { duration: 2, onComplete: () => {
                        console.log('fin') }})
        }
    }, [act])*/
