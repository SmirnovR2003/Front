import React from "react";
import {Picture} from '../funtions'
import styles from './objects.module.css';
interface IPicture {
  picture: Picture,
  key: number,
  position: {x: number, y: number},
  zIndex: number
}

export function Pictures(props: IPicture){
    return <div className={styles.box} style={{left: props.position.x, top: props.position.y}}>
        <img width={props.picture.size.width} height={props.picture.size.heigth} src={props.picture.path} alt="" key={props.key}></img>
    </div>
}