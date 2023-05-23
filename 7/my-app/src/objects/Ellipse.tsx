import { useEffect, useRef } from "react";
import { useState } from "react";
import { Ellipse, isSelected } from "../store/functions/funtions";
import { useDragger } from "../hooks/useDragger";
import styles from './objects.module.css';
import { connect, useDispatch } from "react-redux";
import { store } from "..";
interface IEllipse {
    ellipse: Ellipse
    id: string
    position: {x: number, y: number}
    zIndex: number
    scale: number
    isTemplate: boolean
    isWindowClicked: boolean
}

export function Ellipses(props: IEllipse){
    const dispatch = useDispatch()
    const ellipseParentRef = useRef<HTMLDivElement>(null);
    const ellipseRef = useRef<HTMLDivElement>(null);

    const [isResized, setIsResized]=useState(false)

    const [width, setW]=useState(props.ellipse.radiusX*2 / props.scale)
    const [height, setH]=useState(props.ellipse.radiusY*2 / props.scale)
    const [lastWidth, setLastWidth]=useState(width)
    const [lastHeight, setLastHeight]=useState(height)

    const [pos, setPos]=useState({x: props.position.x / props.scale, y: props.position.y  / props.scale})

    const [isSelect, setIsSelect]=useState(false)

    useEffect(( )=>{
        setIsSelect(isSelected(store.getState(), props.id))
      }, [props.isWindowClicked])

    useEffect( () => {
        setW(props.ellipse.radiusX*2 / props.scale)
        setH(props.ellipse.radiusY*2 / props.scale)
        setPos({x: props.position.x / props.scale, y: props.position.y  / props.scale})
    }, [props.ellipse.radiusX, props.ellipse.radiusY, props.position])
    useDragger(ellipseRef.current, props.id, pos);

    return <div 
                ref={ellipseParentRef}
                className={styles.box} 
                style={{
                    left: props.position.x / props.scale, 
                    top: props.position.y / props.scale,
                    position: "absolute",
                    width: width,
                    height: height,
                    resize: props.isTemplate ? 'none': 'both',
                    boxShadow: isSelect ? '0px 0px 0px 10px rgba(0, 0, 255, 1)' : 'none',
                    zIndex: isSelect ? 10 : 0,
                }}
                
            
                onContextMenu={ e => {
                    e.preventDefault()
                }}
                onMouseDown={ e => {
                    setIsResized(true)
                    setIsSelect(true)
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
                    setIsResized(false)
                    if(isResized && (w !== lastWidth || h !== lastHeight)){
                        dispatch({type: 'EDIT_ELLIPSE_SIZE', id: props.id, rx: width/2, ry: height/2})
                        dispatch({type:"ADD_TO_HISTORY"})
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
                        dispatch({type: "SELECT_BLOCKS", ids: [props.id]})
                        setIsSelect(true)
                    }} 
                    style={{
                        width: width, 
                        height: height, 
                        fill: props.ellipse.color
                    }}
                >
                    <ellipse cx={width/2} cy={height/2} rx={width/2} ry={height/2}/>
                </svg>
               
            </div> 
    </div>
    
}
export default connect()(Ellipses);