/*
    This is the main file for the project.
    useContext is getting the gameState from CaptureWrapper.tsx
    it uses conditionals to render different components based on the game state
    It also has some basic scene setup for lighting and camera
*/

import { useContext} from "react"
import {GameContext} from "./components/CaptureWrapper.tsx"
import {PerspectiveCamera} from "@react-three/drei"
import Plinko from "./components/Plinko.tsx"
import Story from "./components/Story.tsx"
import Result from "./components/Result.tsx"

function App() {

    const [ gameState ] = useContext(GameContext)


    return <>

        { ['story', 'game', 'play'].includes(gameState.section) ? <Story /> : null }

        { gameState.section === 'game' ? <Plinko/> : null}

        { ['play', 'end'].includes(gameState.section) ?
            <Result /> : null }

        <color attach="background" args={['hotpink']} />
        <ambientLight />
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
    </>
}

export default App
