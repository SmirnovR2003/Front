import React from "react";
import { useDispatch } from "react-redux";
import { store } from "../..";
import styles from "./PopupWindow.module.css"
 
interface IPopup{
    popupState: Boolean
    handleClose: Function
}



export function DownloadPopup (props: IPopup) {
    
    const dispatch = useDispatch()

    return (
        <div className={styles.popupBox} onClick={ e => props.handleClose(false)}>
            <div className={styles.box} onClick={ e => e.stopPropagation()}>
                <span className={styles.closeIcon} onClick={ e => props.handleClose(false)}>x</span>
                <input type='file' accept=".json" onChange={ e => {
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                        if(typeof fileReader.result === "string"){


                            let str = fileReader.result.substr(29)

                            let decodedString = JSON.parse(atob(str))
                            console.log(decodedString)
                            dispatch({type: "DOWNLOAD_STATE", state: decodedString})
                            dispatch({type: "ADD_TO_HISTORY"})

                        }
                    }
                    if(e.target.files !== null)
                        fileReader.readAsDataURL(e.target.files[0])
                    props.handleClose(false)}}
                ></input>
            </div>
        </div>
    );
};
 