import React from "react";
import { setectBlocks, Triangle } from "../funtions";
import { dispatch } from "../state";
import styles from './objects.module.css';
interface ITriangle {
    triangle: Triangle,
    key: string,
    position: { x: number,y: number},
    zIndex: number
}

export function Triangles(props: ITriangle){
    let height = Math.max(props.triangle.locationPoint1.y, props.triangle.locationPoint2.y, props.triangle.locationPoint3.y)-Math.min(props.triangle.locationPoint1.y, props.triangle.locationPoint2.y, props.triangle.locationPoint3.y);
    let width = Math.max(props.triangle.locationPoint1.x, props.triangle.locationPoint2.x, props.triangle.locationPoint3.x)-Math.min(props.triangle.locationPoint1.x, props.triangle.locationPoint2.x, props.triangle.locationPoint3.x);
    return<svg onClick={() => dispatch(setectBlocks, [props.key])} className={styles.box} style={{height: height, width: width,zIndex: props.zIndex, left: props.position.x, top: props.position.y}}>
            <polygon points={`${props.triangle.locationPoint1.x}, ${props.triangle.locationPoint1.y} 
            ${props.triangle.locationPoint2.x}, ${props.triangle.locationPoint2.y} 
            ${props.triangle.locationPoint3.x}, ${props.triangle.locationPoint3.y}`}/>
        </svg>
}