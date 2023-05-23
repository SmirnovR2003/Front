import { useEffect, useRef, useState } from 'react';
import { Chars, isSelected} from "../store/functions/funtions"
import { useDragger } from "../hooks/useDragger";
import contexMenuStyles from "./ContextMenu.module.css"
import styles from './objects.module.css';
import {  connect, useDispatch } from 'react-redux';
import { store } from '..';
interface IChar {
  char: Chars,
  id: string,
  position: {x: number, y: number},
  zIndex: number,
  scale: number,
  isTemplate: boolean,
  isWindowClicked: boolean
  isWindowClickedForContextMenu: boolean
}

export function Text(props: IChar){
  const textParentRef = useRef<HTMLDivElement>(null);
  const textParRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  
  const dispatch = useDispatch()


  const [isResized, setIsResized]=useState(false)


  
  const [isShownContextMenu, setIsShownContextMenu] = useState(false);

    const [contexMenuPosition, setContexMenuPosition] = useState({ x: 0, y: 0 });

    const showContextMenu = (event: React.MouseEvent<HTMLTextAreaElement>) => {
        event.preventDefault();

        setIsShownContextMenu(false);
        const newPosition = {
            x: event.pageX,
            y: event.pageY,
        };

        setContexMenuPosition(newPosition);
        setIsShownContextMenu(true);
    };

    const hideContextMenu = () => {
      setIsShownContextMenu(false);
    };

  const [width, setW]=useState(props.char.size.width  / props.scale)
  const [height, setH]=useState(props.char.size.heigth  / props.scale)
  const [lastWidth, setLastWidth]=useState(width)
  const [lastHeight, setLastHeight]=useState(height)
  const [pos, setPos]=useState({x: (props.position.x  / props.scale), y: (props.position.y  / props.scale)})

  const [isSelect, setIsSelect]=useState(false)


  useEffect(( )=>{
    hideContextMenu()
    setIsSelect(isSelected(store.getState(), props.id))
  }, [props.isWindowClicked, props.isWindowClickedForContextMenu])

  useEffect(( )=>{
  }, [props.isWindowClicked])

  const [italic, setItalic]=useState(props.char.italic ? 'italic' : 'normal')
  const [underline, setUnderline]=useState(props.char.bold ? 'bolder' : 'normal')
  const [bold, setBold]=useState(props.char.underline ? 'underline' : 'normal')
  
  useEffect( () => {
    setItalic(props.char.italic ? 'italic' : 'normal')
    setBold(props.char.bold ? 'bolder' : 'normal')
    setUnderline(props.char.underline ? 'underline' : 'normal')
  }, [ props.char.italic, props.char.bold, props.char.underline])


  useEffect( () => {
    setW(props.char.size.width / props.scale)
    setH(props.char.size.heigth / props.scale)
    setPos({x: (props.position.x  / props.scale), y: (props.position.y  / props.scale)})
  }, [ props.char.size.width, props.char.size.heigth, props.position])

  console.log(props)
  useDragger(textParRef.current, props.id, pos);
    return<div
            ref={textParentRef}
            className={styles.box}    
            style={{
              left: props.position.x / props.scale, 
              top: props.position.y / props.scale,
              width: width, 
              height: height,
              position: 'absolute',
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
              let h = Number(textParentRef.current?.style.height.substring(0, textParentRef.current?.style.height.length - 2));
              let w = Number(textParentRef.current?.style.width.substring(0, textParentRef.current?.style.width.length - 2));
              setW(w);
              setH(h);
            }}

            onMouseUp={ e => {
              let h = Number(textParentRef.current?.style.height.substring(0, textParentRef.current?.style.height.length - 2));
              let w = Number(textParentRef.current?.style.width.substring(0, textParentRef.current?.style.width.length - 2));
              if(isResized && (w !== lastWidth || h !== lastHeight)){
                setIsResized(false)
                dispatch({type:"EDIT_TEXT_SIZE", id: props.id, size: {width: width, heigth: height}})
                dispatch({type:"ADD_TO_HISTORY"})
                setLastWidth(width)
                setLastHeight(height)
                console.log(width)
              }
            }}
          >
            <div ref={textParRef}><textarea 
              ref={textRef}
              id={props.id} 
              onClick={ e => {
                e.preventDefault()
                dispatch({type: "SELECT_BLOCKS", ids: [props.id]})
              }} 
              onChange={ e => {
                dispatch({type:"EDIT_TEXT_CONTENT", id: props.id, content: textRef.current?.value})
                dispatch({type:"ADD_TO_HISTORY"})
              }}
              onContextMenu={ e => {
                e.preventDefault()
                showContextMenu(e)
              }}
              defaultValue={props.char.content}
              placeholder={"Введите текст"}
              autoCorrect={"no"}
              spellCheck={false}
              style={{
                height: height-6, 
                width: width-6, 
                color: props.char.color,
                fontSize: `${props.char.fontSize / props.scale}` + 'px',
                fontStyle: italic,
                fontWeight: bold,
                textDecoration: underline,
                border: "none",
                overflow: "hidden",
                background: `rgba(0,0,0, 0)`,
                resize: props.isTemplate ? 'none': 'both',
              }}
            ></textarea></div>

            {isShownContextMenu && <div
              style={{ top: contexMenuPosition.y, left: contexMenuPosition.x }}
              className={contexMenuStyles.customContextMenu}
              onClick={ e => e.stopPropagation()}
            >
              <input 
                defaultValue={props.char.fontSize}
                type='number' 
                className={contexMenuStyles.option} 
                onChange={(e) => {
                  dispatch({type:"EDIT_TEXT_FONT_SIZE", id: props.id, fontSize: e.target.value}); 
                  dispatch({type:"ADD_TO_HISTORY"})
                }}>
              </input>
              <input 
                defaultValue={props.char.color}
                type='color' 
                className={contexMenuStyles.option} 
                onChange={(e) => {
                  dispatch({type:"EDIT_TEXT_COLOR", id: props.id, color: e.target.value})
                  dispatch({type:"ADD_TO_HISTORY"})
                }}
              >
              </input>
              <button 
                onClick={(e) => {
                  dispatch({type:"EDIT_TEXT_BOLD", id: props.id})
                  dispatch({type:"ADD_TO_HISTORY"})
                }} 
                className={contexMenuStyles.option}
              >
                Bold
              </button>
              <button 
                onClick={(e) => {
                  dispatch({type:"EDIT_TEXT_UNDERLINE", id: props.id})
                  dispatch({type:"ADD_TO_HISTORY"})
                }} 
                className={contexMenuStyles.option}
              >
                Underline
              </button>
              <button 
                onClick={(e) => {
                  dispatch({type:"EDIT_TEXT_ITALIC", id: props.id})
                  dispatch({type:"ADD_TO_HISTORY"})
                }} 
                className={contexMenuStyles.option}
              >
                Italic
              </button>
            </div>} 
          </div>
}
export default connect()(Text);