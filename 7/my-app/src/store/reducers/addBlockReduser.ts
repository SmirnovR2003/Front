import { ArtObject, Block, Canvas, Chars, State, Ellipse, generateId, Picture, Rectangle, Triangle, createState } from "../functions/funtions";

export function addBlockReducer(state: State = createState(), action: any): State{
    switch(action.type){
        case "ADD_TEXT": return {
            ...state,
            canvas: addNewBlock(state.canvas, createBlock(createChars()))
        };
        case "ADD_PICTURE": return {
            ...state,
            canvas: addNewBlock(state.canvas, createBlock(createPicture(action.path)))
        };
        case "ADD_ELLIPSE": return {
            ...state,
            canvas: addNewBlock(state.canvas, createBlock(createArtObject(createEllipse())))
        };
        case "ADD_TRIANGLE": return {
            ...state,
            canvas: addNewBlock(state.canvas, createBlock(createArtObject(createTriangle())))
        };
        case "ADD_RECTANGLE": return {
            ...state,
            canvas: addNewBlock(state.canvas, createBlock(createArtObject(createRectangle())))
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