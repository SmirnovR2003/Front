
import { useEffect, useRef, useState } from "react";
import {isSelected, Picture} from "../store/functions/funtions"
import { useDragger } from "../hooks/useDragger";
import styles from './objects.module.css';
import { connect, useDispatch } from "react-redux";
import { store } from "..";

interface IPicture {
  picture: Picture,
  id: string,
  position: {x: number, y: number},
  zIndex: number,
  scale: number,
  isTemplate: boolean
  isWindowClicked: boolean   
}

export function Pictures(props: IPicture){
  const dispatch = useDispatch()
  const pistureRef = useRef<HTMLDivElement>(null);
  const pistureParentRef = useRef<HTMLDivElement>(null);
  const [width, setW]=useState(props.picture.size.width  / props.scale)
  const [height, setH]=useState(props.picture.size.heigth  / props.scale)
  const [lastWidth, setLastWidth]=useState(width)
  const [lastHeight, setLastHeight]=useState(height)
  const [pos, setPos]=useState({x: props.position.x  / props.scale, y: props.position.y / props.scale})
  useDragger(pistureRef.current, props.id, pos);

  const [isResized, setIsResized]=useState(false)
  
  const [isSelect, setIsSelect]=useState(false)
  useEffect(( )=>{
    setIsSelect(isSelected(store.getState(), props.id))
  }, [props.isWindowClicked])

  useEffect( () => {
    setW(props.picture.size.width / props.scale)
    setH(props.picture.size.heigth / props.scale)
    setPos({x: props.position.x / props.scale, y: props.position.y  / props.scale})
  }, [props.picture.size.width, props.picture.size.heigth, props.position])

  return <div 
            ref={pistureParentRef}
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
               
            onContextMenu={ e => {
              e.preventDefault()
            }}

            onMouseDown={ e => {
              setIsResized(true)
              setIsSelect(true)
            }}

            onMouseMove={ e =>{
              if(isResized){
                let h = Number(pistureParentRef.current?.style.height.substring(0, pistureParentRef.current?.style.height.length - 2));
                let w = Number(pistureParentRef.current?.style.width.substring(0, pistureParentRef.current?.style.width.length - 2));
                setW(w);
                setH(h);
              }
            }}
    
            onMouseUp={ e => {
              let h = Number(pistureParentRef.current?.style.height.substring(0, pistureParentRef.current?.style.height.length - 2));
              let w = Number(pistureParentRef.current?.style.width.substring(0, pistureParentRef.current?.style.width.length - 2));
              setIsResized(false)
              if(isResized && (w !== lastWidth || h !== lastHeight)){
                dispatch({type:"EDIT_PICTURE_SIZE", id: props.id, size: {width: width, heigth: height}})
                dispatch({type:"ADD_TO_HISTORY"})
                setLastWidth(width)
                setLastHeight(height)
              }
            }}
              
          >
            <div
              ref={pistureRef}
              id={props.id}
              style={{
                width: width,
                height: height,
                resize: "both",
                contentVisibility: "visible",
              }} 
            >
              <img 
                className={styles.picture}
                onClick={ e => {
                  e.preventDefault()
                  dispatch({type: "SELECT_BLOCKS", ids: [props.id]})
                  setIsSelect(true)
                }} 
                src={props.picture.path}
                draggable={"false"}
                style={{
                  width: width,
                  height: height,
                }}
              ></img>
            </div>
          </div>
}
export default connect()(Pictures);