import React, { useState } from 'react';
import { addBlock, createCanvas, createTriangle, generateId } from '../funtions';
import { dispatch } from '../state';
import styles from "./Creats.module.css"
import { PopupWindow } from './PopupWindow';

interface ICreateObject{
    setActive: Function;
}

export function CreateObject(props: ICreateObject){
    return <div className={styles.box} ><a style={{padding: 5}}>Создать</a>
            <button onClick={() => dispatch(createCanvas, "canvas")}>Новый холст</button>
            <button onClick={() => dispatch(addBlock, "triangle")}>Tреугольник</button>
            <button onClick={() => dispatch(addBlock, "rect")}>Прямоугольник</button>
            <button onClick={() => dispatch(addBlock, "circle")}>Круг</button>
            <button onClick={() => dispatch(addBlock, "text")}>Текст</button>
            <button onClick={() => props.setActive(true)}>Картинку</button>
        </div>
    
}