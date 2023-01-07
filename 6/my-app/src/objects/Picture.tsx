import { url } from "inspector";
import { Resizable } from "re-resizable";
import React, { useEffect, useRef, useState } from "react";
import {editPictureSize, Picture, setectBlocks} from "../functions/funtions"
import { useDragger } from "../hooks/useDragger";
import { dispatch } from "../state";
import styles from './objects.module.css';
interface IPicture {
  picture: Picture,
  id: string,
  position: {x: number, y: number},
  zIndex: number
}

export function Pictures(props: IPicture){
  const pistureRef = useRef<HTMLDivElement>(null);
  const pistureParentRef = useRef<HTMLDivElement>(null);
  const [width, setW]=useState(props.picture.size.width)
  const [height, setH]=useState(props.picture.size.heigth)
  const [lastWidth, setLastWidth]=useState(width)
  const [lastHeight, setLastHeight]=useState(height)
  const [pos, setPos]=useState(props.position)
  useDragger(pistureRef.current, pistureParentRef.current, props.id, pos);

  const [isResized, setIsResized]=useState(false)
  
  useEffect( () => {
    setW(props.picture.size.width)
    setH(props.picture.size.heigth)
    setPos(props.position)
  }, [props.picture.size.width, props.picture.size.heigth, props.position])
    return <div 
              ref={pistureParentRef}
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
                if(isResized){
                let h = Number(pistureParentRef.current?.style.height.substring(0, pistureParentRef.current?.style.height.length - 2));
                let w = Number(pistureParentRef.current?.style.width.substring(0, pistureParentRef.current?.style.width.length - 2));
                setW(w);
                setH(h);
                console.log(width, w)
                }
              }}
    
              onMouseUp={ e => {
                let h = Number(pistureParentRef.current?.style.height.substring(0, pistureParentRef.current?.style.height.length - 2));
                let w = Number(pistureParentRef.current?.style.width.substring(0, pistureParentRef.current?.style.width.length - 2));
                setIsResized(false)
                if(isResized && (w !== lastWidth || h !== lastHeight)){
                  dispatch(editPictureSize, ['addToHistory', props.id, {dw: width, dh: height}])
                  setLastWidth(width)
                  setLastHeight(height)
                }
              }}
          
                  //dispatch(editPictureSize, ['addToHistory', props.id, {dw, dh}])
              
            >

              <div
                ref={pistureRef}
                id={props.id}
                style={{
                  width: width,
                  height: height,
                  resize: "both"
                }} 
                onMouseDown={ e => {
                  setIsResized(true)
                }}
      
                onMouseMove={ e =>{
                  if(isResized){
                  let h = Number(pistureParentRef.current?.style.height.substring(0, pistureParentRef.current?.style.height.length - 2));
                  let w = Number(pistureParentRef.current?.style.width.substring(0, pistureParentRef.current?.style.width.length - 2));
                  setW(w);
                  setH(h);
                  console.log(width, w)
                  }
                }}
      
                onMouseUp={ e => {
                  let h = Number(pistureParentRef.current?.style.height.substring(0, pistureParentRef.current?.style.height.length - 2));
                  let w = Number(pistureParentRef.current?.style.width.substring(0, pistureParentRef.current?.style.width.length - 2));
                  setIsResized(false)
                  if(isResized && (w !== lastWidth || h !== lastHeight)){
                    dispatch(editPictureSize, ['addToHistory', props.id, {dw: width, dh: height}])
                    setLastWidth(width)
                    setLastHeight(height)
                  }
                }}>
                <img 
                    onClick={ e => {
                        e.preventDefault()
                        dispatch(setectBlocks, [props.id])
                    }} 
                    src={props.picture.path}
                    draggable={"false"}
          
                    style={{
                      width: width,
                      height: height,
                    }}
          ></img></div>
    </div>
}