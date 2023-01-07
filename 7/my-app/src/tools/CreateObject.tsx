import React, { useState } from 'react';
import {createCanvas, createTriangle, generateId } from "../store/functions/funtions";
import styles from "./Creats.module.css"
import { Popup } from './Popups/PopupWindow';
import { useDispatch } from 'react-redux';

interface ICreateObject{
    showPopup: Function
}

export function CreateObject(props:ICreateObject){
    const dispatch = useDispatch()
    return <div className={styles.box} ><a style={{padding: 5}}>Создать</a>{
        <div>
            <button onClick={() => dispatch({type: "NEW_CANVAS"})}>Новый холст</button>
            <button onClick={() => dispatch({type: "ADD_TRIANGLE"})}>Tреугольник</button>
            <button onClick={() => dispatch({type: "ADD_RECTANGLE"})}>Прямоугольник</button>
            <button onClick={() => dispatch({type: "ADD_ELLIPSE"})}>Овал</button>
            <button onClick={() => dispatch({type: "ADD_TEXT"})}>Текст</button>
            <button onClick={() => props.showPopup(true)}>Картинку</button>
         </div>
    }</div>
    
}