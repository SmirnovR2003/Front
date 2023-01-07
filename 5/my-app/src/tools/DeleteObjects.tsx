import React from 'react';
import { deleteAllBlocks, deleteBlocks } from '../funtions';
import { dispatch, getState } from '../state';
import styles from "./Creats.module.css"

export function DeleteObjects(){
    return <div className={styles.box}><a style={{padding: 5}}>Удалить</a>{
        <div>
            <button onClick={() => dispatch(deleteAllBlocks, getState)}>Все элементы</button>
            <button onClick={() => dispatch(deleteBlocks, getState)}>Выделенные</button>
        </div>
    }</div>
}

export {}