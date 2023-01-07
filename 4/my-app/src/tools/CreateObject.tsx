import React from 'react';
import styles from "./Creats.module.css"

export function CreateObject(){
    return <div className={styles.box} ><a style={{padding: 5}}>Создать</a>{
        <div>
            <button>Tреугольник</button>
            <button>Прямоугольник</button>
            <button>Круг</button>
            <button>Текст</button>
            <button>Картинку</button>
        </div>
    }</div>
}