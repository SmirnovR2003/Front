import { Resizable } from "re-resizable";
import React, { useEffect, useRef, useState } from "react";
import { moveTriangleLocationPoints, setectBlocks, Triangle } from "../functions/funtions";
import { useDragger } from "../hooks/useDragger";
import { dispatch, getElementById } from "../state";
import styles from './objects.module.css';
interface ITriangle {
    triangle: Triangle,
    id: string,
    position: { x: number,y: number},
    zIndex: number
}

export function Triangles(props: ITriangle){
    const triangleRef = useRef<HTMLDivElement>(null);
    const triangleParentRef = useRef<HTMLDivElement>(null);
    const [x1, setX1] = useState(props.triangle.locationPoint1.x)
    const [x2, setX2] = useState(props.triangle.locationPoint2.x)
    const [x3, setX3] = useState(props.triangle.locationPoint3.x)
    const [y1, setY1] = useState(props.triangle.locationPoint1.y)
    const [y2, setY2] = useState(props.triangle.locationPoint2.y)
    const [y3, setY3] = useState(props.triangle.locationPoint3.y)

    const [pos, setPos]=useState(props.position)


    const [isResized, setIsResized]=useState(false)

    const [height, setH] = useState(Math.max(y1, y2, y3)-Math.min(y1, y2, y3))
    const [width, setW] = useState(Math.max(x1, x2, x3)-Math.min(x1, x2, x3))

    useEffect( () => {
        setX1(props.triangle.locationPoint1.x)
        setX2(props.triangle.locationPoint2.x)
        setX3(props.triangle.locationPoint3.x)
        setY1(props.triangle.locationPoint1.y)
        setY2(props.triangle.locationPoint2.y)
        setY3(props.triangle.locationPoint3.y)
        
        setPos(props.position)
                
            
        console.log(height, width, props)
    }, [props.triangle.locationPoint1, props.triangle.locationPoint2, props.triangle.locationPoint3, props.position])

    useEffect( () => {
        setH(Math.max(y1, y2, y3)-Math.min(y1, y2, y3))
        setW(Math.max(x1, x2, x3)-Math.min(x1, x2, x3))
    }, [x1, x2, x3, y1, y2, y3])

    useDragger(triangleRef.current, triangleParentRef.current, props.id, pos);
    return  <div
                ref={triangleParentRef}
                className={styles.box} 
                style={{
                    resize: "both",
                    left: pos.x, 
                    top: pos.y,
                    width: width, 
                    height: height 
                }}
                
                onMouseDown={ e => {
                    setIsResized(true)
                }}
  
                onMouseMove={ () =>{
                    if(isResized){
                        let h = Number(triangleParentRef.current?.style.height.substring(0, triangleParentRef.current?.style.height.length - 2));
                        let w = Number(triangleParentRef.current?.style.width.substring(0, triangleParentRef.current?.style.width.length - 2));
                        setW(w);
                        setH(h);
                    }
                }}
                onMouseUp={ () => {
                    setIsResized(false)
                    if(isResized){
                        let h = Number(triangleParentRef.current?.style.height.substring(0, triangleParentRef.current?.style.height.length - 2));
                        let w = Number(triangleParentRef.current?.style.width.substring(0, triangleParentRef.current?.style.width.length - 2));
                        dispatch(moveTriangleLocationPoints, ['addToHistory', props.id, {x1: w/2, y1: 0, x2: 0, y2: h, x3: w, y3: h}])

                    }
                }}
            >    
                <div 
                    ref={triangleRef}
                    style={{
                        height: height, 
                        width: width
                    }}
                >
                <svg 
                    id={props.id} 
                    onClick={ e => {
                        e.preventDefault()
                        dispatch(setectBlocks, [props.id])
                    }} 
                    style={{
                        height: height, 
                        width: width
                    }}
                >
                    <polygon points={`
                        ${width/2}, ${0} 
                        ${0}, ${height} 
                        ${width}, ${height}
                    `}/>
                </svg></div>
                
            </div>
}