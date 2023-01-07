import React from 'react';
import styles from "./Creats.module.css"

export function CreateTemplates(){
    return <div className={styles.box} ><a style={{padding: 5}}>Шаблон</a>{
        <div>
            <button>Создать</button>
            <button>Открыть</button>
        </div>
    }</div>
}