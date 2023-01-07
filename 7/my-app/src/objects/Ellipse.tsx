import { Resizable } from "re-resizable";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { Ellipse, setectBlocks, editEllipseSize } from "../store/functions/funtions";
import { useDragger } from "../hooks/useDragger";
import { dispatch } from "../state";
import styles from './objects.module.css';
interface IEllipse {
    ellipse: Ellipse,
    id: string,
    position: {x: number, y: number},
    zIndex: number
}

export function Ellipses(props: IEllipse){
    const ellipseParentRef = useRef<HTMLDivElement>(null);
    const ellipseRef = useRef<HTMLDivElement>(null);

    const [isResized, setIsResized]=useState(false)

    const [width, setW]=useState(props.ellipse.radiusX*2)
    const [height, setH]=useState(props.ellipse.radiusY*2)
    const [lastWidth, setLastWidth]=useState(width)
    const [lastHeight, setLastHeight]=useState(height)

    const [pos, setPos]=useState(props.position)

    useEffect( () => {
        setW(props.ellipse.radiusX*2)
        setH(props.ellipse.radiusY*2)
        setPos(props.position)
    }, [props.ellipse.radiusX, props.ellipse.radiusY, props.position])
    useDragger(ellipseRef.current, ellipseParentRef.current, props.id, pos);

    return <div 
                ref={ellipseParentRef}
                className={styles.box} 
                style={{
                    resize: "both",
                    left: props.position.x, 
                    top: props.position.y,
                    position: "absolute",
                    width: width,
                    height: height
                }}
                
            
                onMouseDown={ e => {
                    setIsResized(true)
                }}
  
                onMouseMove={ e =>{
                    if(isResized){
                        let h = Number(ellipseParentRef.current?.style.height.substring(0, ellipseParentRef.current?.style.height.length - 2));
                        let w = Number(ellipseParentRef.current?.style.width.substring(0, ellipseParentRef.current?.style.width.length - 2));
                        setW(w);
                        setH(h);
                    }
                }}
  
                onMouseUp={ e => {
                    let h = Number(ellipseParentRef.current?.style.height.substring(0, ellipseParentRef.current?.style.height.length - 2));
                    let w = Number(ellipseParentRef.current?.style.width.substring(0, ellipseParentRef.current?.style.width.length - 2));
                    if(isResized && (w !== lastWidth || h !== lastHeight)){
                        setIsResized(false)
                        dispatch(editEllipseSize, ['addToHistory', props.id, {dw: width/2, dh: height/2}])
                        setLastWidth(width)
                        setLastHeight(height)
                    }
                }}
            ><div 
                ref={ellipseRef}
                id={props.id}
            >
                <svg 
                    onClick={ e => {
                        e.preventDefault()
                        dispatch(setectBlocks, [props.id])
                    }} 
                    style={{
                        width: width, 
                        height: height, 
                        fill: props.ellipse.color
                    }}
                >
                    <ellipse cx={width/2} cy={height/2} rx={width/2} ry={height/2}/>
                </svg>
               
            </div> </div>
    
}