import React from "react";
import { Rectangle } from "../funtions";
interface IRectangle {
    rect: Rectangle,
    key: number
}

export function Rectangles(props: IRectangle){
    return(
        <svg>
            <rect width={props.rect.rightBottom.x - props.rect.leftTop.x} height={props.rect.rightBottom.y - props.rect.leftTop.y} />
        </svg>
    )
}