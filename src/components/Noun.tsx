// nouns: "Banana", "Banana peel", "Donut", "Bagel", "Crab", "Monkey", "Eye", "Knife", "Cabbage", "Tire", "Fish", "Pasta", "Fries", "Hot dog", "Burger", "Soda", "Bug", "Butter", "Dog", "Cheese", "Fridge", "Gummy worm", "Ice cream", "Mug", "Worm", "Rock", "Scooter", "Snake", "Spring", "Toast", "Fly", "Coffin", "Lips", "Forklift"

import Banana from "./3D/Banana.tsx";
import Bananapeel from "./3D/Bananapeel.tsx";
import Doughnut from "./3D/Doughnut.tsx";
import Dog from "./3D/Dog.tsx";
import Bagel from "./3D/Bagel.tsx";
import Crab from "./3D/Crab.tsx";
import Monkey from "./3D/Monkey.tsx";
import Eyes from "./3D/Eyes.tsx";
import Knife from "./3D/Knife.tsx";
import Forklift from "./3D/Forklift.tsx";
import Cabbage from "./3D/Cabbage.tsx";
import Tire from "./3D/Tire.tsx";
import Fish from "./3D/Fish.tsx";
import Lips from "./3D/Lips.tsx";
import Coffin from "./3D/Coffin.tsx";
import Fly from "./3D/Fly.tsx";
import Toast from "./3D/Toast.tsx";
import Spring from "./3D/Spring.tsx";
import Snake from "./3D/Snake.tsx";
import Scooter from "./3D/Scooter.tsx";
import Rock from "./3D/Rock.tsx";
import Worm from "./3D/Worm.tsx";
import Mug from "./3D/Mug.tsx";
import Icecream from "./3D/Icecream.tsx";
import Fridge from "./3D/Fridge.tsx";
import Cheese from "./3D/Cheese.tsx";
import Butter from "./3D/Butter.tsx";
import Bug from "./3D/Bug.tsx";
import Soda from "./3D/Soda.tsx";
import Burger from "./3D/Burger.tsx";
import Fries from "./3D/Fries.tsx";
import {forwardRef} from "react";
import * as THREE from "three";
import Waffle from "./3D/Waffle.tsx";

type Props = {
    noun: string
} & JSX.IntrinsicElements['group']

const Noun = forwardRef<THREE.Group, Props>(({noun, ...props}: Props, ref) => {

    // write a switch statement to return the correct 3D model for each noun
    switch (noun) {
        case 'Banana':
            return <Banana ref={ref} {...props} />
        case 'Banana peel':
            return <Bananapeel ref={ref} {...props} />
        case 'Donut':
            return <Doughnut ref={ref} {...props} />
        case 'Dog':
            return <Dog ref={ref} {...props} />
        case 'Bagel':
            return <Bagel ref={ref} {...props} />
        case 'Crab':
            return <Crab ref={ref} {...props} />
        case 'Monkey':
            return <Monkey ref={ref} {...props} />
        case 'Eye':
            return <Eyes ref={ref} {...props} />
        case 'Knife':
            return <Knife ref={ref} {...props} />
        case 'Cabbage':
            return <Cabbage ref={ref} {...props} />
        case 'Tire':
            return <Tire ref={ref} {...props} />
        case 'Fish':
            return <Fish ref={ref} {...props} />
        case 'Pasta':
            return <Scooter ref={ref} {...props} />
        case 'Fries':
            return <Fries ref={ref} {...props} />
        case 'Hot dog':
            return <Burger ref={ref} {...props} />
        case 'Burger':
            return <Burger ref={ref} {...props} />
        case 'Soda':
            return <Soda ref={ref} {...props} />
        case 'Bug':
            return <Bug ref={ref} {...props} />
        case 'Butter':
            return <Butter ref={ref} {...props} />
        case 'Cheese':
            return <Cheese ref={ref} {...props} />
        case 'Fridge':
            return <Fridge ref={ref} {...props} />
        case 'Gummy worm':
            return <Worm ref={ref} {...props} />
        case 'Ice cream':
            return <Icecream ref={ref} {...props} />
        case 'Mug':
            return <Mug ref={ref} {...props} />
        case 'Worm':
            return <Worm ref={ref} {...props} />
        case 'Rock':
            return <Rock ref={ref} {...props} />
        case 'Scooter':
            return <Scooter ref={ref} {...props} />
        case 'Snake':
            return <Snake ref={ref} {...props} />
        case 'Spring':
            return <Spring ref={ref} {...props} />
        case 'Toast':
            return <Toast ref={ref} {...props} />
        case 'Fly':
            return <Fly ref={ref} {...props} />
        case 'Coffin':
            return <Coffin ref={ref} {...props} />
        case 'Lips':
            return <Lips ref={ref} {...props} />
        case 'Forklift':
            return <Forklift ref={ref} {...props} />
        case 'Waffle':
            return <Waffle ref={ref} />

        default:
            return <Dog ref={ref} {...props} />
    }
})

export default Noun
