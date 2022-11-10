import React from "react";
import { Circles } from "./circle";
import { Rectangles } from "./rectangle";
import { Triangles } from "./triangle";
import {ArtObject} from "../funtions"

interface IArtObject {
    artObject: ArtObject,
    key: number
}

export function ArtObjects(props: IArtObject){
    return(
        (props.artObject.content.type === "circle") ?
        <Circles circle={props.artObject.content} key={props.key}></Circles>
        
        :(props.artObject.content.type === "rectangle") ?
        <Rectangles rect={props.artObject.content} key={props.key}></Rectangles>

        :(props.artObject.content.type === "triangle") ?
        <Triangles triangle={props.artObject.content} key={props.key}></Triangles>

        : <></>
    )

    
}