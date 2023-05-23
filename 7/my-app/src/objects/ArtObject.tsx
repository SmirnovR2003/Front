import { Rectangles } from "./Rectangle";
import { Triangles } from "./Triangle";
import { ArtObject } from "../store/functions/funtions"
import { Ellipses } from "./Ellipse";
import { connect } from "react-redux";

interface IArtObject {
    artObject: ArtObject
    id: string
    position: {x: number, y: number}
    zIndex: number
    scale: number
    isTemplate: boolean
    isWindowClicked: boolean
}

export function ArtObjects(props: IArtObject){
    switch (props.artObject.content.type) {
        case "ellipse":
            return <Ellipses 
                ellipse={props.artObject.content} 
                id={props.id} 
                position={props.position} 
                zIndex={props.zIndex} 
                scale={props.scale}
                isTemplate={props.isTemplate}
                isWindowClicked={props.isWindowClicked}    
            ></Ellipses>

        case "rectangle":
            return <Rectangles 
                rect={props.artObject.content} 
                id={props.id} 
                position={props.position} 
                zIndex={props.zIndex} 
                scale={props.scale}
                isTemplate={props.isTemplate}
                isWindowClicked={props.isWindowClicked}    
            ></Rectangles>

        case "triangle":
            return <Triangles 
                triangle={props.artObject.content} 
                id={props.id} 
                position={props.position} 
                zIndex={props.zIndex} 
                scale={props.scale}
                isTemplate={props.isTemplate}
                isWindowClicked={props.isWindowClicked}    
            ></Triangles>
            
        default:
            return null;
    } 
}
export default connect()(ArtObjects);