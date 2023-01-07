import { Resizable } from "re-resizable";
import React, { createRef, useEffect, useRef, useState } from "react";
import { editRectangleRightBottom, Rectangle, setectBlocks } from "../functions/funtions";
import { useDragger } from "../hooks/useDragger";
import { dispatch } from "../state";
import styles from './objects.module.css';
interface IRectangle {
    rect: Rectangle,
    id: string,
    position: {x: number, y: number},
    zIndex: number
}

export function Rectangles(props: IRectangle){

    const rectRef = useRef<HTMLDivElement>(null);
    const rectParentRef = useRef<HTMLDivElement>(null);
    
    const [isResized, setIsResized]=useState(false)
    
    const [width, setW]=useState(props.rect.rightBottom.x)
    const [height, setH]=useState(props.rect.rightBottom.y)
    const [lastWidth, setLastWidth]=useState(width)
    const [lastHeight, setLastHeight]=useState(height)
    const [pos, setPos]=useState(props.position)
    useEffect( () => {
        setW(props.rect.rightBottom.x)
        setH(props.rect.rightBottom.y)
        setPos(props.position)
    }, [props.rect.rightBottom.x, props.position])
    
    useDragger(rectRef.current, rectParentRef.current, props.id, pos);
    return <div     
        ref={rectParentRef}
        className={styles.box} 
        style={{
            width: width, 
            height: height,
            left: props.position.x, 
            top: props.position.y,
            resize: "both"
        }} 
        
          onMouseDown={ e => {
            setIsResized(true)
          }}

          onMouseMove={ e =>{
            let h = Number(rectParentRef.current?.style.height.substring(0, rectParentRef.current?.style.height.length - 2));
            let w = Number(rectParentRef.current?.style.width.substring(0, rectParentRef.current?.style.width.length - 2));
            setW(w);
            setH(h);
          }}

          onMouseUp={ e => {
            let h = Number(rectParentRef.current?.style.height.substring(0, rectParentRef.current?.style.height.length - 2));
            let w = Number(rectParentRef.current?.style.width.substring(0, rectParentRef.current?.style.width.length - 2));
            setIsResized(false)
            if(isResized && (w !== lastWidth || h !== lastHeight)){
              dispatch(editRectangleRightBottom, ['addToHistory', props.id, {dw: width, dh: height}])
              setLastWidth(width)
              setLastHeight(height)
              console.log(width)
            }
          }}
        >
        <div ref={rectRef}><svg 
            style={{
                width: width, 
                height: height
            }}
            id={props.id}
            onClick={ e => {
                e.preventDefault()
                dispatch(setectBlocks, [props.id])
            }} 
        >
            <rect width={width} height={height}/>
        </svg></div>
    </div>
} 