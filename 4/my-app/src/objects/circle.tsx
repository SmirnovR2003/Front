import React from "react";
import { Circle } from "../funtions";
interface ICircle {
    circle: Circle,
    key: number
}

export function Circles(props: ICircle){
    return(
        <svg>
            <circle cx={`${props.circle.center.x}`} cy={`${props.circle.center.y}`} r={`${props.circle.radius}`}/>
        </svg>
    )
}