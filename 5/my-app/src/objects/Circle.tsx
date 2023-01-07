import React from "react";
import { updateReturn } from "typescript";
import { Circle, setectBlocks } from "../funtions";
import { dispatch } from "../state";
import styles from './objects.module.css';
interface ICircle {
    circle: Circle,
    key: string,
    position: {x: number, y: number},
    zIndex: number
}

export function Circles(props: ICircle){
    return <svg  
                onClick={() => dispatch(setectBlocks, [props.key])}
                className={styles.box} 
                style={{
                    width: props.circle.radius*2, 
                    height: props.circle.radius*2, 
                    left: props.position.x, 
                    top: props.position.y}}>
            <circle cx={props.circle.radius} cy={props.circle.radius} r={`${props.circle.radius}`}/>
        </svg>
    
}