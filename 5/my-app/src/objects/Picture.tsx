import React from "react";
import {Picture, setectBlocks} from '../funtions'
import { dispatch } from "../state";
import styles from './objects.module.css';
interface IPicture {
  picture: Picture,
  key: string,
  position: {x: number, y: number},
  zIndex: number
}

export function Pictures(props: IPicture){
    return <div 
              onClick={() => dispatch(setectBlocks, [props.key])} 
              className={styles.box} 
              style={{
                left: props.position.x, 
                top: props.position.y
              }}>
        <img width={props.picture.size.width} height={props.picture.size.heigth} src={props.picture.path} alt="" key={props.key}></img>
    </div>
}