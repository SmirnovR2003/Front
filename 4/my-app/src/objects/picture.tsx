import React from "react";
import {Picture} from '../funtions'
interface IPicture {
  picture: Picture,
  key: number
}

export function Pictures(props: IPicture){
    return (
        <img width={props.picture.size.width} height={props.picture.size.heigth} src={props.picture.path} alt="" key={props.key}></img>
    )
}