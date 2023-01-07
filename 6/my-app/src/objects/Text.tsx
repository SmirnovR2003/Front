import { Resizable } from 're-resizable';
import { useEffect, useRef, useState } from 'react';
import {Block, Chars, editBlockLocation, editCharsColor, editCharsContent, editCharsFontSize, editCharsSize, setectBlocks} from "../functions/funtions"
import { useDragger } from "../hooks/useDragger";
import { dispatch, getState } from "../state";
import contexMenuStyles from "./ContextMenu.module.css"
import styles from './objects.module.css';
interface IChar {
  char: Chars,
  id: string,
  position: {x: number, y: number},
  zIndex: number
}

export function Text(props: IChar){
  const textParentRef = useRef<HTMLDivElement>(null);
  const textParRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  let italic = props.char.italic ? 'italic' : 'normal';
  let bold = props.char.bold ? 'bolder' : 'normal';
  let underline = props.char.bold ? 'underline' : 'normal';

  const [isResized, setIsResized]=useState(false)


  
  const [isShownContextMenu, setIsShownContextMenu] = useState(false);

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const showContextMenu = (event: React.MouseEvent<HTMLTextAreaElement>) => {
        event.preventDefault();

        setIsShownContextMenu(false);
        const newPosition = {
            x: event.pageX,
            y: event.pageY,
        };

        setPosition(newPosition);
        setIsShownContextMenu(true);
    };

    const hideContextMenu = () => {
      setIsShownContextMenu(false);
    };

  window.addEventListener('click', hideContextMenu)

  const [width, setW]=useState(props.char.size.width)
  const [height, setH]=useState(props.char.size.heigth)
  const [lastWidth, setLastWidth]=useState(width)
  const [lastHeight, setLastHeight]=useState(height)
  const [pos, setPos]=useState(props.position)

  useEffect( () => {
    setW(props.char.size.width)
    setH(props.char.size.heigth)
    setPos(props.position)
  }, [props.char.size.width,props.char.size.heigth, props.position])

  useEffect( () => {
    italic = props.char.italic ? 'italic' : 'normal';
    bold = props.char.bold ? 'bolder' : 'normal';
    underline = props.char.underline ? 'underline' : 'normal';

  }, [props.char.italic, props.char.bold, props.char.underline])

  useDragger(textParRef.current, textParentRef.current, props.id, pos);
    return<div
            ref={textParentRef}
            className={styles.box}    
            style={{
              resize: "both",
              left: pos.x, 
              top: pos.y,
              width: width, 
              height: height,
              position: 'absolute'
            }}
            
            onChange={ e => {
              dispatch(editCharsContent, ['addToHistory', props.id, textRef.current?.value])
            }}

            onMouseDown={ e => {
              setIsResized(true)
            }}

            onMouseMove={ e =>{
              let h = Number(textParentRef.current?.style.height.substring(0, textParentRef.current?.style.height.length - 2));
              let w = Number(textParentRef.current?.style.width.substring(0, textParentRef.current?.style.width.length - 2));
              setW(w);
              setH(h);
            }}

            onMouseUp={ e => {
              let h = Number(textParentRef.current?.style.height.substring(0, textParentRef.current?.style.height.length - 2));
              let w = Number(textParentRef.current?.style.width.substring(0, textParentRef.current?.style.width.length - 2));
              setIsResized(false)
              if(isResized && (w !== lastWidth || h !== lastHeight)){
                dispatch(editCharsSize, ['addToHistory', props.id, {dw: width, dh: height}])
                setLastWidth(width)
                setLastHeight(height)
                console.log(width)
              }
            }}

        >
          <div ref={textParRef}>  
          <textarea 
            ref={textRef}
            id={props.id} 
            
            onChange={ e => {
              dispatch(editCharsContent, ['addToHistory', props.id, textRef.current?.value])
            }}
            onClick={ e => {
              e.preventDefault()
              hideContextMenu()
              dispatch(setectBlocks, [props.id])
            }} 
            onContextMenu={ e => {
              e.preventDefault()
              showContextMenu(e)
            }}
            defaultValue={props.char.content} 
            style={{
              resize: 'none',
              zIndex: props.zIndex,
              height: height-6, 
              width: width-6, 
              color: props.char.color,
              fontSize: props.char.fontSize + 'px',
              fontStyle: italic,
              fontWeight: bold,
              textDecoration: underline
            }}
          ></textarea>
          </div> 
            {isShownContextMenu && <div
              style={{ top: position.y, left: position.x }}
              className={contexMenuStyles.customContextMenu}
              onClick={ e => e.stopPropagation()}
            >
            <input 
              defaultValue={props.char.fontSize}
              type='number' 
              className={contexMenuStyles.option} 
              onChange={(e) => {
                dispatch(editCharsFontSize, ['addToHistory', props.id, e.target.value]); 
                console.log(e.target.value)
              }}>
            </input>
            <input 
              defaultValue={props.char.color}
              type='color' 
              className={contexMenuStyles.option} 
              onChange={(e) => dispatch(editCharsColor, ['addToHistory', props.id, e.target.value])}>
            </input>
          </div>}
        </div>
    
}