import React from "react";
import { Triangle } from "../funtions";
import styles from './objects.module.css';
interface ITriangle {
    triangle: Triangle,
    key: number,
    position: { x: number,y: number},
    zIndex: number
}

export function Triangles(props: ITriangle){
    return<div className={styles.box} style={{zIndex: props.zIndex, left: props.position.x, top: props.position.y}}>
        <svg>
            <polygon points={`${props.triangle.locationPoint1.x} ${props.triangle.locationPoint1.y},
                ${props.triangle.locationPoint2.x} ${props.triangle.locationPoint2.y},
                ${props.triangle.locationPoint3.x} ${props.triangle.locationPoint3.y},
            `}/>
        </svg>
    </div>
}