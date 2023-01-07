import { ArtObject, Block, Canvas, Chars, Ellipse, State, generateId, Picture, Rectangle, Triangle } from "./store/functions/funtions"

const triangle1: Triangle = {
    locationPoint1: { x: 10, y: 100 },
    locationPoint2: { x: 10, y: 20 },
    locationPoint3: { x: 200, y: 90 },
    color: 'red',
    type: "triangle"
}

const artObject3: ArtObject = {
    content: triangle1,
    contentType: "artObject"
}

const block5: Block = {
    background: 'background2',
    location: {
        x: 500,  
        y: 450
    },
    content: artObject3,
    zIndex: 1,
    id: generateId()
} 
const rect1: Rectangle = {
    leftTop: { x: 500, y: 200 },
    rightBottom: { x: 600, y: 400 },
    color: 'red',
    type: "rectangle"
}

const artObject2: ArtObject = {
    content: rect1,
    contentType: "artObject"
}

const block4: Block = {
    background: 'background2',
    location: {
        x: 350,  
        y: 250
    },
    content: artObject2,
    zIndex: 1,
    id: generateId()
} 

const circle1: Ellipse = {
    center: { x: 300, y: 300 },
    radiusX: 100,
    radiusY: 50,
    color: 'red',
    type: "ellipse"
}

const artObject1: ArtObject = {
    content: circle1,
    contentType: "artObject"
}

const block3: Block = {
    background: 'background2',
    location: {
        x: 300,  
        y: 300
    },
    content: artObject1,
    zIndex: 1,
    id: generateId()
} 

const picture1: Picture = {
    size: {
        width: 250,
        heigth: 300
    },
    filter: null,
    path: 'data:img/png;base64,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',
    contentType: "picture"
}

const block2: Block = {
    background: 'background2',
    location: {
        x: 100,  
        y: 20
    },
    content: picture1,
    zIndex: 1,
    id: generateId()
} 

const text1: Chars = {
    size: {
        width: 200, 
        heigth: 300
    },
    color: 'red',
    content: 'a1j',
    fontSize: 20,
    contentType: 'text',
    bold: true,
    italic: true,
    underline: true
}

const block1: Block = {
    background: 'background2',
    location: {
        x: 200,  
        y: 200
    },
    content: text1,
    zIndex: 10,
    id: generateId()
} 

const canvas: Canvas = {
    size: {
        width: 800, 
        heigth: 600
    },
    background: 'background1',
    filter: null,
    blocks: [block1, block2, block3, block4, block5]
}

export const editor1: State = {
    selectedBlocks: [block2, block3],
    canvas: canvas,
    history: [canvas],
    templates: [],
    historyIndex: 0
}

