import React from "react";
import { useDispatch } from "react-redux";
import CollectingApp from "../../objects/CollectingApp";
import { State } from "../../store/functions/funtions";
import styles from "./PopupWindow.module.css"
 
interface IPopup{
    state: State
    popupState: Boolean
    handleClose: Function
}



export function TemplatesPopup (props: IPopup) {
    
    const dispatch = useDispatch()

    let count = 0
    return (
        <div className={styles.popupBox} onClick={ e => props.handleClose(false)}>
            <div className={styles.box} onClick={ e => e.stopPropagation()}>
                <span className={styles.closeIcon} onClick={ e => props.handleClose(false)}>x</span>
                {props.state.templates.map(e => {
                    return<div 
                        className={styles.content} 
                        onClick={ () => {
                            dispatch({type: "SELECT_TEMPLATE", canvas: e})
                            props.handleClose(false)
                        }}
                    >
                        <CollectingApp canvas={e} scale={3} isTemplate={true} showCanvasPicturePopup={() => { } } popupState={true} isWindowClicked={false} isWindowClickedForContextMenu={false}></CollectingApp>
                    </div>
                })}
            </div>
        </div>
    );
};
 