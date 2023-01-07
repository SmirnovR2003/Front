import React from "react";
import { Rectangles } from "./Rectangle";
import { Triangles } from "./Triangle";
import { ArtObject } from "../functions/funtions"
import { Ellipses } from "./Ellipse";

interface IArtObject {
    artObject: ArtObject,
    id: string,
    position: {x: number, y: number},
    zIndex: number
}

export function ArtObjects(props: IArtObject){
    switch (props.artObject.content.type) {
        case "ellipse":
            return <Ellipses ellipse={props.artObject.content} id={props.id} position={props.position} zIndex={props.zIndex} ></Ellipses>

        case "rectangle":
            return <Rectangles rect={props.artObject.content} id={props.id} position={props.position} zIndex={props.zIndex} ></Rectangles>

        case "triangle":
            return <Triangles triangle={props.artObject.content} id={props.id} position={props.position} zIndex={props.zIndex} ></Triangles>
            
        default:
            return null;
    } 
}