import { useEffect, useRef, useState } from 'react';
import {Text} from '../objects/Text'
import {Pictures} from '../objects/Picture'
import { ArtObjects } from '../objects/ArtObject';
import style from './App.module.css'
import { Canvas, State} from "../store/functions/funtions";
import { connect, useDispatch } from 'react-redux';
import contexMenuStyles from "./ContextMenu.module.css"

interface ICollectingApp {
    canvas: Canvas
    scale: number
    isTemplate: boolean
    showCanvasPicturePopup: Function
    popupState: boolean
    isWindowClicked: boolean
    isWindowClickedForContextMenu: boolean
}

export const CollectingApp = (props: ICollectingApp) => {
  
    const appRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch()

    const [isResized, setIsResized]=useState(false)

    const [width, setW]=useState(props.canvas.size.width / props.scale)
    const [height, setH]=useState(props.canvas.size.heigth / props.scale)
    const [lastWidth, setLastWidth]=useState(width)
    const [lastHeight, setLastHeight]=useState(height)

    useEffect(()=>{
        setW(props.canvas.size.width  / props.scale)
        setH(props.canvas.size.heigth  / props.scale)
    }, [props.canvas.size.width, props.canvas.size.heigth])

    const [isShownContextMenu, setIsShownContextMenu] = useState(false);

    const [contexMenuPosition, setContexMenuPosition] = useState({ x: 0, y: 0 });

    const showContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
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

    useEffect(( )=>{
        hideContextMenu()
        console.log( props.isWindowClicked)
    }, [props.isWindowClickedForContextMenu, props.isWindowClicked])

    return <div 
        ref={appRef}
        id="app"
        tabIndex={0}
        style={{
            width: width, 
            height: height,
            resize: props.isTemplate ? 'none': 'both',
            backgroundColor: 'rgb(255, 255, 255)',
            backgroundImage: ((props.canvas.background !== null) ? ` url(${props.canvas.background}) ` : 'none'),
        }}
        className={style.box} 
            
        onContextMenu={ e => {
            if(!e.defaultPrevented){
                showContextMenu(e)
            }
        }}

        onMouseDown={ e => {
            if(!e.defaultPrevented){
                setIsResized(true)
            }
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
            if(isResized && (width !== lastWidth || height !== lastHeight)){
                setIsResized(false)
                dispatch({type:"EDIT_CANVAS_SIZE", size: {width: width, heigth: height}})
                dispatch({type:"ADD_TO_HISTORY"})
                setLastWidth(width)
                setLastHeight(height)
            }
        }}
    >{
        props.canvas.blocks.map(block => {
            switch (block.content.contentType) {
                case "picture":
                    return <Pictures 
                        picture={block.content} 
                        id={block.id} 
                        key={block.id} 
                        position={block.location} 
                        zIndex={block.zIndex} 
                        scale={props.scale}
                        isTemplate={props.isTemplate}
                        isWindowClicked={props.isWindowClicked}    
                    ></Pictures>
  
                case "text":
                    return <Text 
                        char={block.content}
                        id={block.id}
                        key={block.id}
                        position={block.location}
                        zIndex={block.zIndex}
                        scale={props.scale}
                        isTemplate={props.isTemplate}
                        isWindowClickedForContextMenu={props.isWindowClickedForContextMenu} 
                        isWindowClicked={props.isWindowClicked}                        
                    ></Text>
  
                case "artObject": 
                    return <ArtObjects 
                        artObject={block.content} 
                        id={block.id} 
                        key={block.id} 
                        position={block.location} 
                        zIndex={block.zIndex} 
                        scale={props.scale}
                        isTemplate={props.isTemplate}
                        isWindowClicked={props.isWindowClicked}    
                    ></ArtObjects>
          
                default:
                    return null;
            }
        })
    }
    {(isShownContextMenu && !props.popupState) && <div
        style={{ top: contexMenuPosition.y, left: contexMenuPosition.x }}
        className={contexMenuStyles.customContextMenu}
        onClick={ e => e.stopPropagation()}
        onMouseDown={ e => e.stopPropagation()}
    >
        <button 
            className={contexMenuStyles.option}  
            onClick={e => {
                props.showCanvasPicturePopup(true)
                hideContextMenu()
            }}>
                Вставить картинку для фона
            </button>
        </div>} 
    </div>
}


export default connect()(CollectingApp);