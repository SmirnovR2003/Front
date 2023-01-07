import React, { useState } from 'react';
import { addBlock, createCanvas, createTriangle, generateId } from "../functions/funtions";
import { dispatch } from '../state';
import styles from "./Creats.module.css"
import { Popup } from './Popups/PopupWindow';

interface ICreateObject{
    showPopup: Function
}

export function CreateObject(props:ICreateObject){
    return <div className={styles.box} ><a style={{padding: 5}}>Создать</a>{
        <div>
            <button onClick={() => dispatch(createCanvas, ['addToHistory'])}>Новый холст</button>
            <button onClick={() => dispatch(addBlock, ['addToHistory', "triangle"])}>Tреугольник</button>
            <button onClick={() => dispatch(addBlock, ['addToHistory', "rect"])}>Прямоугольник</button>
            <button onClick={() => dispatch(addBlock, ['addToHistory', "circle"])}>Круг</button>
            <button onClick={() => dispatch(addBlock, ['addToHistory', "text"])}>Текст</button>
            <button onClick={() => props.showPopup(true)}>Картинку</button>
         </div>
    }</div>
    
}