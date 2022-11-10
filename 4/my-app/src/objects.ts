import { ArtObject, Block, Canvas, Chars, Circle, Editor, Picture, Rectangle, Triangle } from "./funtions"

const triangle1: Triangle = {
    locationPoint1: { x: 10, y: 90 },
    locationPoint2: { x: 10, y: 20 },
    locationPoint3: { x: 20, y: 90 },
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
        x: 150,  
        y: 250
    },
    content: artObject3,
    id: 2
} 
const rect1: Rectangle = {
    leftTop: { x: 190, y: 100 },
    rightBottom: { x: 1000, y: 900 },
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
        x: 150,  
        y: 250
    },
    content: artObject2,
    id: 2
} 

const circle1: Circle = {
    center: { x: 10, y: 90 },
    radius: 10,
    color: 'red',
    type: "circle"
}

const artObject1: ArtObject = {
    content: circle1,
    contentType: "artObject"
}

const block3: Block = {
    background: 'background2',
    location: {
        x: 150,  
        y: 250
    },
    content: artObject1,
    id: 2
} 

const picture1: Picture = {
    size: {
        width: 200,
        heigth: 300
    },
    filter: null,
    path: 'cat.webp',
    contentType: "picture"
}

const block2: Block = {
    background: 'background2',
    location: {
        x: 100,  
        y: 250
    },
    content: picture1,
    id: 1
} 

const text1: Chars = {
    size: {
        width: 20, 
        heigth: 30
    },
    color: 'red',
    content: 'a1j',
    fontSize: {
        width: 20, 
        heigth: 30
    },
    contentType: 'text',
    bold: false,
    italic: false,
    underline: false
}

const block1: Block = {
    background: 'background2',
    location: {
        x: 100,  
        y: 200
    },
    content: text1,
    id: 0
} 

const canvas: Canvas = {
    size: {
        width: 600, 
        heigth: 800
    },
    background: 'background1',
    filter: null,
    blocks: [block1, block2, block3, block4, block5]
}

export const editor: Editor = {
    selectedBlocks: [block2, block3],
    canvas: canvas,
    history: [canvas]
}

