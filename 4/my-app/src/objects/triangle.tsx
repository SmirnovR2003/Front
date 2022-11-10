import React from "react";
import { Triangle } from "../funtions";
interface ITriangle {
    triangle: Triangle,
    key: number
}

export function Triangles(props: ITriangle){
    return(
        <svg>
            <polyline points={`${props.triangle.locationPoint1.x} ${props.triangle.locationPoint1.y},
                ${props.triangle.locationPoint2.x} ${props.triangle.locationPoint2.y},
                ${props.triangle.locationPoint3.x} ${props.triangle.locationPoint3.y},
            `}/>
        </svg>
    )
}