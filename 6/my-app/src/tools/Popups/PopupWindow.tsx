import React from "react";
import { addBlock } from "../../functions/funtions";
import { dispatch } from "../../state";
import styles from "./PopupWindow.module.css"
 
interface IPopup{
    popupState: Boolean
    handleClose: Function
}

const addImageBaseHandler = (e:any) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
        dispatch(addBlock, ["addToHistory", "picture",fileReader.result])
    }
    fileReader.readAsDataURL(e.target.files[0])
}

export function Popup (props: IPopup) {

    return (
        <div className={styles.popupBox} onClick={ e => props.handleClose(false)}>
            <div className={styles.box} onClick={ e => e.stopPropagation()}>
                <span className={styles.closeIcon} onClick={ e => props.handleClose(false)}>x</span>
                <input type='file' accept=".png, .jpeg" onChange={ e => {addImageBaseHandler(e); props.handleClose(false)}}></input>
            </div>
        </div>
    );
};
 