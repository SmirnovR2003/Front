import { useEffect, useRef, useState } from "react";
import { isSelected, Triangle } from "../store/functions/funtions";
import { useDragger } from "../hooks/useDragger";
import styles from './objects.module.css';
import { connect, useDispatch } from "react-redux";
import { store } from "..";

interface ITriangle {
    triangle: Triangle,
    id: string,
    position: { x: number,y: number},
    zIndex: number,
    scale: number,
    isTemplate: boolean
    isWindowClicked: boolean   
}

export function Triangles(props: ITriangle){
    
    const dispatch = useDispatch()
    
    const triangleRef = useRef<HTMLDivElement>(null);
    const triangleParentRef = useRef<HTMLDivElement>(null);
    const [x1, setX1] = useState(props.triangle.locationPoint1.x)
    const [x2, setX2] = useState(props.triangle.locationPoint2.x)
    const [x3, setX3] = useState(props.triangle.locationPoint3.x)
    const [y1, setY1] = useState(props.triangle.locationPoint1.y)
    const [y2, setY2] = useState(props.triangle.locationPoint2.y)
    const [y3, setY3] = useState(props.triangle.locationPoint3.y)

    const [pos, setPos]=useState({x: props.position.x  / props.scale, y: props.position.y  / props.scale})


    const [isResized, setIsResized]=useState(false)

    const [isSelect, setIsSelect]=useState(false)

    
  useEffect(( )=>{
    setIsSelect(isSelected(store.getState(), props.id))
  }, [props.isWindowClicked])

    const [height, setH] = useState((Math.max(y1, y2, y3)-Math.min(y1, y2, y3)) / props.scale)
    const [width, setW] = useState((Math.max(x1, x2, x3)-Math.min(x1, x2, x3)) / props.scale)

    useEffect( () => {
        setX1(props.triangle.locationPoint1.x)
        setX2(props.triangle.locationPoint2.x)
        setX3(props.triangle.locationPoint3.x)
        setY1(props.triangle.locationPoint1.y)
        setY2(props.triangle.locationPoint2.y)
        setY3(props.triangle.locationPoint3.y)
        
        setPos({x: props.position.x  / props.scale, y: props.position.y  / props.scale})
    }, [props.triangle.locationPoint1, props.triangle.locationPoint2, props.triangle.locationPoint3, props.position])

    useEffect( () => {
        setH((Math.max(y1, y2, y3)-Math.min(y1, y2, y3)) / props.scale)
        setW((Math.max(x1, x2, x3)-Math.min(x1, x2, x3)) / props.scale)
    }, [x1, x2, x3, y1, y2, y3])

    
    useDragger(triangleRef.current, props.id, pos);
    return  <div
                ref={triangleParentRef}
                className={styles.box} 
                style={{
                    left: props.position.x / props.scale, 
                    top: props.position.y / props.scale,
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
                        dispatch({type: "EDIT_TRIANGLE_SIZE", addToHistory: true, id: props.id, x1: w/2, y1: 0, x2: 0, y2: h, x3: w, y3: h})
                        dispatch({type: "ADD_TO_HISTORY"})

                    }
                }}
            >    
                <div 
                    ref={triangleRef}
                    style={{
                        height: height, 
                        width: width,
                    }}
                >
                    <svg 
                        id={props.id} 
                        onClick={ e => {
                            e.preventDefault()
                            dispatch({type: "SELECT_BLOCKS", ids: [props.id]})
                        }} 
                        style={{
                            height: height, 
                            width: width,
                            fill: props.triangle.color,
                        }}
                    >
                        <polygon
                            points={`
                                ${width/2}, ${0} 
                                ${0}, ${height} 
                                ${width}, ${height}
                            `}
                        />
                    </svg>
                </div>
            </div>
}
export default connect()(Triangles);