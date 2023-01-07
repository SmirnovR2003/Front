import React from 'react';
import styles from "./Creats.module.css"
import { htmlToJPEG, htmlToPNG } from '../store/functions/htmlToCanvas';

export function ExportCard(){
    return <div className={styles.box} ><a style={{padding: 5}}>Экспортировать открытку</a>{
        <div>
            <button onClick={ () => htmlToPNG("app")}>в PNG</button>
            <button onClick={ () => htmlToJPEG("app")}>в JPEG</button>
        </div>
    }</div>
}