import React from "react";
import { Rectangles } from "./Rectangle";
import { Triangles } from "./Triangle";
import { ArtObject } from "../funtions"
import { Circles } from "./Circle";

interface IArtObject {
    artObject: ArtObject,
    key: string,
    position: {x: number, y: number},
    zIndex: number
}

export function ArtObjects(props: IArtObject){
    switch (props.artObject.content.type) {
        case "circle":
            return <Circles circle={props.artObject.content} key={props.key} position={props.position} zIndex={props.zIndex} ></Circles>

        case "rectangle":
            return <Rectangles rect={props.artObject.content} key={props.key} position={props.position} zIndex={props.zIndex} ></Rectangles>

        case "triangle":
            return <Triangles triangle={props.artObject.content} key={props.key} position={props.position} zIndex={props.zIndex} ></Triangles>
            
        default:
            return null;
    } 
}