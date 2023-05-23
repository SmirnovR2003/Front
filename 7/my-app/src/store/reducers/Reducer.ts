import { ArtObject, Block, Canvas, Chars, State, Ellipse, generateId, Picture, Rectangle, Triangle, createState, createCanvas, editCanvasSize, editCharsSize, editEllipseSize, editPictureSize, editRectangleRightBottom, moveTriangleLocationPoints, addToHistory, prevHistory, currHistory, editBlockLocation, editCharsColor, editCharsContent, editCharsFontSize, addTemplate, selectTemplate, setectBlocks, deleteBlocks, editCanvasBackground, editCharsItalic, editCharsUnderline, editCharsBold } from "../functions/funtions";

import * as initialState from '../../templates.json'

export function Reducer(state: State = createState(JSON.parse(`${initialState}`)), action: any): State{
    console.log(action)
    switch(action.type){
        //state
        case "DOWNLOAD_STATE": return {
            ...action.state
        };
        //canvas
        case "NEW_CANVAS": return {
            ...state,
            canvas: createCanvas()
        };
        case "EDIT_CANVAS_SIZE": return {
            ...editCanvasSize(state, action)
        };
        case "SELECT_BLOCKS": return {
            ...setectBlocks(state, action.ids)
        };
        case "ADD_PICTURE_TO_BACKGROUND": return {
            ...editCanvasBackground(state, action)
        };

        //templates
        case "ADD_TO_TEMPLATES": return {
            ...addTemplate(state)
        };
        case "SELECT_TEMPLATE": return {
            ...selectTemplate(state, action.canvas)
        };

        //text
        case "ADD_TEXT": return {
            ...state,
            canvas: addNewBlock(state.canvas, createBlock(createChars()))
        };
        case "EDIT_TEXT_SIZE": return {
            ...editCharsSize(state, action)
        };
        case "EDIT_TEXT_FONT_SIZE": return {
            ...editCharsFontSize(state, action)
        };
        case "EDIT_TEXT_CONTENT": return {
            ...editCharsContent(state, action)
        };
        case "EDIT_TEXT_COLOR": return {
            ...editCharsColor(state, action)
        };
        case "EDIT_TEXT_ITALIC": return {
            ...editCharsItalic(state, action)
        };
        case "EDIT_TEXT_UNDERLINE": return {
            ...editCharsUnderline(state, action)
        };
        case "EDIT_TEXT_BOLD": return {
            ...editCharsBold(state, action)
        };

        //picture
        case "ADD_PICTURE": return {
            ...state,
            canvas: addNewBlock(state.canvas, createBlock(createPicture(action.path)))
        };
        case "EDIT_PICTURE_SIZE": return {
            ...editPictureSize(state, action)
        };

        //ellipse
        case "ADD_ELLIPSE": return {
            ...state,
            canvas: addNewBlock(state.canvas, createBlock(createArtObject(createEllipse())))
        };
        case "EDIT_ELLIPSE_SIZE": return {
            ...editEllipseSize(state, action)
        };

        //triangle
        case "ADD_TRIANGLE": return {
            ...state,
            canvas: addNewBlock(state.canvas, createBlock(createArtObject(createTriangle())))
        };
        case "EDIT_TRIANGLE_SIZE": return {
            ...moveTriangleLocationPoints(state, action)
        };

        //rectangle
        case "ADD_RECTANGLE": return {
            ...state,
            canvas: addNewBlock(state.canvas, createBlock(createArtObject(createRectangle())))
        };
        case "EDIT_RECTANGLE_SIZE": return {
            ...editRectangleRightBottom(state, action)
        };

        //block
        case "EDIT_BLOCK_LOCATION": return {
            ...editBlockLocation(state, action)
        };
        case "DELETE_BLOCK": return {
            ...deleteBlocks(state)
        };

        //history
        case "ADD_TO_HISTORY": return {
            ...addToHistory(state)
        };
        case "PREV_HISTORY": return {
            ...prevHistory(state)
        };
        case "CURR_HISTORY": return {
            ...currHistory(state)
        };

        default: return {...state}
    }
}

export function addNewBlock(canvas: Canvas, block: Block): Canvas{
    return {
        ...canvas,
        blocks: [...canvas.blocks, block]
    }
} 

export function createBlock(content: Chars | Picture | ArtObject): Block{
    return {
        background: null,
        location: {
            x: 0, 
            y: 0
        },
        content: content,
        zIndex: 1,
        id: generateId()
    }
}

export function createChars(): Chars{
    return {
        contentType: 'text',
        size: {
            width: 100, 
            heigth: 100,
        },
        color: 'black',
        content: '',
        fontSize: 20,
        bold: false,
        italic: false,
        underline: false
    };
}

export function createPicture(path: string): Picture{
    return {
        contentType: "picture",
        size: {
            width: 100, 
            heigth: 100,
        },
        filter: null,
        path: path
    };
}

export function createArtObject(content: Ellipse | Rectangle | Triangle): ArtObject{
    return {
        content: content,
        contentType: "artObject"
    };
}

export function createEllipse(): Ellipse{
    return {
        center: {
            x: 100,
            y: 100
        },
        radiusX: 100,
        radiusY: 50,
        color: "black",
        type: "ellipse"
    };
}

export function createRectangle(): Rectangle{
    return {
        leftTop: {
            x: 0,
            y: 0
        },
        rightBottom: {
            x: 100,
            y: 100
        },
        color: "black",
        type: "rectangle"
    };
}

export function createTriangle(): Triangle{
    return {
        locationPoint1: {
            x: 100,
            y: 0
        },
        locationPoint2: {
            x: 0,
            y: 100
        },
        locationPoint3: {
            x: 200,
            y: 100
        },
        color: "black",
        type: "triangle"
    };
}