import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import Worm from "./3D/Worm.tsx";
import Eyes from "./3D/Eyes.tsx";

export default function Test(){
    return <Canvas style={{width: '700px', height: '80%'}}>
        <Worm>
            {/*<Angry/>*/}
            {/*<Concerned />*/}
            <Eyes />
            {/*<Happy/>*/}
            {/*<Cry />*/}
            {/*<Sleepy />*/}
        </Worm>
        <OrbitControls />
    </Canvas>
}
