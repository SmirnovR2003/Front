import React from "react";
import { useDispatch } from "react-redux";
import styles from "./PopupWindow.module.css"
 
interface IPopup{
    popupState: Boolean
    handleClose: React.Dispatch<React.SetStateAction<boolean>>
}



export function PicturePopup (props: IPopup) {
    
    const dispatch = useDispatch()

    return (
        <div className={styles.popupBox} onClick={ e => props.handleClose(false)}>
            <div className={styles.box} onClick={ e => e.stopPropagation()}>
                <span className={styles.closeIcon} onClick={ e => props.handleClose(false)}>x</span>
                <input type='file' accept=".jpg, .png, .jpeg" onChange={ e => {
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                        dispatch({type: "ADD_PICTURE", path: fileReader.result})
                        dispatch({type: "ADD_TO_HISTORY"})
                    }
                    if(e.target.files !== null)
                        fileReader.readAsDataURL(e.target.files[0])
                    props.handleClose(false)}}
                ></input>
            </div>
        </div>
    );
};
 