import React from "react";
import { Rectangle, setectBlocks } from "../funtions";
import { dispatch } from "../state";
import styles from './objects.module.css';
interface IRectangle {
    rect: Rectangle,
    key: string,
    position: {x: number, y: number},
    zIndex: number
}

export function Rectangles(props: IRectangle){
    let recWidth: number = props.rect.rightBottom.x - props.rect.leftTop.x;
    let recHeight: number = props.rect.rightBottom.y - props.rect.leftTop.y;
    return<svg 
        className={styles.box} 
        style={{
            left: props.position.x, 
            top: props.position.y
        }} 
        onClick={() => dispatch(setectBlocks, [props.key])} 
        width={recWidth} 
        height={recHeight}
    >
        <rect width={recWidth} 
            height={recHeight}
        />
    </svg>
} 