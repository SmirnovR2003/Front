import React from 'react';
import { ImageLoader } from './ImageLoader';
import styles from "./PopupWindow.module.css"

interface IPopup{
    type: string;
    active: boolean;
    setActive: Function;
}

export function PopupWindow(props: IPopup){
    return <div className={(styles.box, props.active ? styles.active : '')} onClick={() => props.setActive(false)} >
        <ImageLoader active={props.active} setActive={props.setActive}></ImageLoader>
    </div>
}