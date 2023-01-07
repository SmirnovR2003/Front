import React from "react";
import { Rectangle } from "../funtions";
import styles from './objects.module.css';
interface IRectangle {
    rect: Rectangle,
    key: number,
    position: {x: number, y: number},
    zIndex: number
}

export function Rectangles(props: IRectangle){
    let recWidth: number = props.rect.rightBottom.x - props.rect.leftTop.x;
    let recHeight: number = props.rect.rightBottom.y - props.rect.leftTop.y;
    return<div className={styles.box} 
        style={{
            left: props.position.x, 
            top: props.position.y,
            width: recWidth,
            height: recHeight
        }}>
        <svg width={recWidth} height={recHeight}>
            <rect width={recWidth} 
                height={recHeight}
            />
        </svg>
    </div>
}