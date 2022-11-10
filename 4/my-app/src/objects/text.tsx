import React from "react";
import {Chars} from '../funtions'
interface IChar {
  char: Chars,
  key: number
}

export function Text(props: IChar){
    return (
        <input defaultValue={props.char.content} key={props.key}></input>
    )
}