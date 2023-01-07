import React, { useEffect, useRef, useState } from 'react';
import {Text} from '../objects/Text'
import {Pictures} from '../objects/Picture'
import { ArtObjects } from '../objects/ArtObject';
import style from './/App.module.css'
import { currHistory, editCanvasSize, State, prevHistory, setectBlocks } from "../store/functions/funtions";
import { dispatch } from '../state';
import { Resizable } from 're-resizable';

interface ICollectingApp {
  editor: State
}

export const CollectingApp = (props: ICollectingApp) => {
  
    const appRef = useRef<HTMLDivElement>(null);


    const [isResized, setIsResized]=useState(false)

    const [width, setW]=useState(props.editor.canvas.size.width)
    const [height, setH]=useState(props.editor.canvas.size.heigth)
    const [lastWidth, setLastWidth]=useState(width)
    const [lastHeight, setLastHeight]=useState(height)
    useEffect(()=>{
        setW(props.editor.canvas.size.width)
        setH(props.editor.canvas.size.heigth)
    }, [props.editor.canvas.size.width, props.editor.canvas.size.heigth])
    return <div 
        onClick={ e => {
            if(!e.defaultPrevented) dispatch(setectBlocks, [])
        }} 
        ref={appRef}
        id="app"
        tabIndex={0}
        style={{
            width: width, 
            height: height,
            resize: 'both'
        }}
        className={style.box} 
            
        onMouseDown={ e => {
            if(!e.defaultPrevented){
            setIsResized(true)
            console.log(width, height, lastWidth, lastHeight)}
          }}

          onMouseMove={ e =>{
            if(isResized && !e.defaultPrevented){
            let h = Number(appRef.current?.style.height.substring(0, appRef.current?.style.height.length - 2));
            let w = Number(appRef.current?.style.width.substring(0, appRef.current?.style.width.length - 2));
            setW(w);
            setH(h);
            }
          }}

          onMouseUp={ e => {
            let h = Number(appRef.current?.style.height.substring(0, appRef.current?.style.height.length - 2));
            let w = Number(appRef.current?.style.width.substring(0, appRef.current?.style.width.length - 2));
            if(isResized && (width !== lastWidth || height !== lastHeight)){
                
            setIsResized(false)
              dispatch(editCanvasSize, ['addToHistory', {width: width, heigth: height}])
              setLastWidth(width)
              setLastHeight(height)
              console.log(width, height, lastWidth, lastHeight)
            }
          }}
        >{
            props.editor.canvas.blocks.map(block => {
                switch (block.content.contentType) {
                    case "picture":
                        return <Pictures picture={block.content} id={block.id} key={block.id} position={block.location} zIndex={block.zIndex} ></Pictures>
  
                    case "text":
                        return <Text char={block.content} id={block.id} key={block.id} position={block.location} zIndex={block.zIndex} ></Text>
  
                    case "artObject": 
                        return <ArtObjects artObject={block.content} id={block.id} key={block.id} position={block.location} zIndex={block.zIndex} ></ArtObjects>
          
                    default:
                        return null;
                }
            })
        }
    </div>
}

