import React from "react";
import { updateReturn } from "typescript";
import { Circle } from "../funtions";
import styles from './objects.module.css';
interface ICircle {
    circle: Circle,
    key: number,
    position: {x: number, y: number},
    zIndex: number
}

export function Circles(props: ICircle){
    return <svg  className={styles.box} style={{width: props.circle.radius*2, height: props.circle.radius*2, left: props.position.x, top: props.position.y}} >
            <circle cx={`${props.circle.center.x}`} cy={`${props.circle.center.y}`} r={`${props.circle.radius}`}/>
        </svg>
    
}