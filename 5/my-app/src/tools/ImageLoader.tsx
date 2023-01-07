import React from 'react';
import { addBlock, createPicture } from '../funtions';
import { dispatch } from '../state';
import styles from "./PopupWindow.module.css"
import FileBase64 from 'react-file-base64';

interface IImageLoader{
    active: boolean;
    setActive: Function;
}

export function ImageLoader(this: any, props: IImageLoader){

    return <div className={props.active ? (styles.content, styles.active) : styles.content} onClick={e => e.stopPropagation()}>
        <form onSubmit={(evt) => {
            dispatch(addBlock, ["picture", evt.preventDefault()])
        }}>
            <FileBase64  multiple={ true } onDone={ this.getFiles.bind(this) } />
            <button type='submit'>Создать</button>
        </form>
    </div>
}

