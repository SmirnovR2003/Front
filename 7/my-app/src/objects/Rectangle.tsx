import { useEffect, useRef, useState } from "react";
import { isSelected, Rectangle } from "../store/functions/funtions";
import { useDragger } from "../hooks/useDragger";
import styles from './objects.module.css';
import { connect, useDispatch } from "react-redux";
import { store } from "..";

interface IRectangle {
  rect: Rectangle,
  id: string,
  position: {x: number, y: number},
  zIndex: number,
  scale: number,
  isTemplate: boolean
  isWindowClicked: boolean   
}

export function Rectangles(props: IRectangle){
  const dispatch = useDispatch()

  const rectRef = useRef<HTMLDivElement>(null);
  const rectParentRef = useRef<HTMLDivElement>(null);
    
  const [isResized, setIsResized]=useState(false)
    
  const [width, setW]=useState(props.rect.rightBottom.x / props.scale)
  const [height, setH]=useState(props.rect.rightBottom.y / props.scale)
  const [lastWidth, setLastWidth]=useState(width)
  const [lastHeight, setLastHeight]=useState(height)
  const [pos, setPos]=useState({x: props.position.x  / props.scale, y: props.position.y  / props.scale})

  const [isSelect, setIsSelect]=useState(false)

  useEffect(( )=>{
    setIsSelect(isSelected(store.getState(), props.id))
  }, [props.isWindowClicked])

  useEffect( () => {
    setW(props.rect.rightBottom.x / props.scale)
    setH(props.rect.rightBottom.y / props.scale)
    setPos({x: props.position.x  / props.scale, y: props.position.y  / props.scale})
  }, [props.rect.rightBottom.x, props.position])
    
  useDragger(rectRef.current, props.id, pos);
  return <div     
          ref={rectParentRef}
          className={styles.box} 
          style={{
            width: width, 
            height: height,
            left: props.position.x / props.scale, 
            top: props.position.y / props.scale,
            resize: props.isTemplate ? 'none': 'both',
            boxShadow: isSelect ? '0px 0px 0px 10px rgba(0, 0, 255, 1)' : 'none',
            zIndex: isSelect ? 10 : 0,
          }} 
        
          onMouseDown={ e => {
            setIsResized(true)
            setIsSelect(true)
          }}

          onContextMenu={ e => {
            e.preventDefault()
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
              dispatch({type:"EDIT_RECTANGLE_SIZE", id: props.id, size: {x: width, y: height}})
              dispatch({type: "ADD_TO_HISTORY"})
              setLastWidth(width)
              setLastHeight(height)
            }
          }}
        >
          <div ref={rectRef}><svg 
            style={{
              width: width, 
              height: height,
              fill: props.rect.color
            }}
            id={props.id}
            onClick={ e => {
              e.preventDefault()
              dispatch({type: "SELECT_BLOCKS", ids: [props.id]})
              setIsSelect(true)
            }} 
          >
            <rect width={width} height={height}/>
          </svg></div>
        </div>
} 
export default connect()(Rectangles);