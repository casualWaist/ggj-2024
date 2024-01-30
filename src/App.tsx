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
import Title from "./components/Title.tsx"
import Story from "./components/Story.tsx"
import Result from "./components/Result.tsx"
import {chosenWords} from "./components/CaptureWrapper.tsx"
import StoryResult from "./components/StoryResult.tsx"

function App() {

    const [ gameState ] = useContext(GameContext)


    return <>

        { gameState[0] === 'pregame' ? <Title /> : null }

        { gameState[0] === 'story' ? <Story /> : null }

        { gameState[0] === 'game' ? <Plinko/> : null}

        { ['play', 'end'].includes(gameState[0]) ?
            <Result
                result0={chosenWords[0]}
                result1={chosenWords[1]}
                result2={chosenWords[2]}
                result3={chosenWords[3]}
                result4={chosenWords[4]}
                result5={chosenWords[5]}
                result6={chosenWords[6]}
                result7={chosenWords[7]}
                result8={chosenWords[8]}
                result9={chosenWords[9]}
            />
            : null }

        { gameState[0] === 'play' ? <StoryResult /> : null }

        <color attach="background" args={['hotpink']} />
        <ambientLight />
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
    </>
}

export default App
