import { normalize } from "path";
import React from "react";
import {Chars} from '../funtions'
import styles from './objects.module.css';
interface IChar {
  char: Chars,
  key: number,
  position: {x: number, y: number},
  zIndex: number
}

export function Text(props: IChar){
  let italic = props.char.italic ? 'italic' : 'normal';
  let bold = props.char.bold ? 'bolder' : 'normal';
  let underline = props.char.bold ? 'underline' : 'normal';
    return <textarea 
            defaultValue={props.char.content} 
            key={props.key} 
            className={styles.box} 
            style={{
              zIndex: props.zIndex,
              height: props.char.size.heigth, 
              width: props.char.size.width, 
              left: props.position.x, 
              top: props.position.y,
              color: props.char.color,
              fontSize: props.char.fontSize + 'px',
              fontStyle: italic,
              fontWeight: bold,
              textDecoration: underline
            }}>
          </textarea>
    
}