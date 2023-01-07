export type Editor = {
    selectedBlocks: Block[],
    canvas: Canvas,
    history: Canvas[],
    templates: Canvas[]
}

export type Canvas = {
    size: Size,
    background: string | null,
    filter: string | null,
    blocks: Block[]
}

export type Block = {
    background: string | null,
    location: Locations,
    content: Chars | Picture | ArtObject,
    zIndex: number,
    id: string
} 

export type Chars = {
    contentType: 'text',
    size: Size,
    color: string,
    content: string,
    fontSize: number,
    bold: boolean,
    italic: boolean,
    underline: boolean
}

export type Picture = {
    contentType: 'picture',
    size: Size,
    filter: string | null,
    path: string
}

export type ArtObject = {
    contentType: 'artObject',
    content: Circle | Rectangle | Triangle
}
export type Circle = {
    center: Locations,
    radius: number,
    color: string,
    type: 'circle'   
}

export type Rectangle = {
    leftTop: Locations,
    rightBottom: Locations,
    color: string,
    type: 'rectangle'      
}

export type Triangle = {
    locationPoint1: Locations, 
    locationPoint2: Locations,
    locationPoint3: Locations,
    color: string,
    type: 'triangle' 
}


export type Size = {
    width: number,
    heigth: number
}

export type Locations = {
    x: number,
    y: number
}


export function generateId() {
    return Math.random().toString(16).slice(2)
}

//editor
export function setectBlocks(editor: Editor, ids: string[]): Editor {
    return {
        ...editor,
        selectedBlocks: editor.canvas.blocks.filter(element => {for (let id of ids){
            if(element.id === id){
                return false;
            }
            return true;
}}),
    }
}
export function createEditor(): Editor{
    return {
        selectedBlocks: [],
        canvas: {
            size: {
                width: 800,
                heigth: 600
            },
        background: null,
        filter: null,
        blocks: []
        },
        history: [],
        templates:[]
    }
} 

export function deleteAllBlocks(editor:Editor): Editor{
    return {
        ...editor,
        canvas: {size: editor.canvas.size,
            background: editor.canvas.background,
            filter: editor.canvas.filter,
            blocks: [],
        }
    }
} 

export function addBlock(editor: Editor, props: string[]): Editor{
    switch(props[0]){
        case "text": return {
            ...editor,
            canvas: addNewBlock(editor.canvas, createBlock(createChars()))
        };
        case "picture": return {
            ...editor,
            canvas: addNewBlock(editor.canvas, createBlock(createPicture(props[1])))
        };
        case "circle": return {
            ...editor,
            canvas: addNewBlock(editor.canvas, createBlock(createArtObject(createCircle())))
        };
        case "triangle": return {
            ...editor,
            canvas: addNewBlock(editor.canvas, createBlock(createArtObject(createTriangle())))
        };
        case "rect": return {
            ...editor,
            canvas: addNewBlock(editor.canvas, createBlock(createArtObject(createRectangle())))
        };
        default: return {...editor}
    }
}


// canvas
export function createCanvas(editor: Editor): Editor{
    return {
        ...editor,
        canvas: {
            size: {
                width: 800, 
                heigth: 600
            },
            background: null,
            filter: null,
            blocks: []
        }
    }
} 
export function addNewBlock(canvas: Canvas, block: Block): Canvas{
    return {
        ...canvas,
        blocks: [...canvas.blocks, block]
    }
} 
export function deleteBlocks(editor: Editor): Editor {
    return {
        ...editor,
        canvas: {
            blocks: editor.canvas.blocks.filter(element => {for (let item of editor.selectedBlocks){
                                                                if(element.id === item.id){
                                                                    return false;
                                                                }
                                                                return true;
            }}),
            size: editor.canvas.size,
            background: editor.canvas.background,
            filter: editor.canvas.filter
        }
    };
} 
export function editCanvasSize(canvas: Canvas, newSize: Size): Canvas{
    return {
        ...canvas,
        size: newSize,
    }

}
export function editCanvasBackground(canvas: Canvas, newBackground: string | null): Canvas{
    return {
        ...canvas,
        background: newBackground,
    }
}
export function editCanvasFilter(canvas: Canvas, newFilter: string | null): Canvas{
    return {
        ...canvas,
        filter: newFilter,
    }
}

//block
export function createBlock(content: Chars | Picture | ArtObject): Block{
    return {
        background: null,
        location: {
            x: 110, 
            y: 110
        },
        content: content,
        zIndex: 1,
        id: generateId()
    }
}
export function editBlockBackground(block: Block, newBackground: string | null): Block{
    return {
        ...block,
        background: newBackground,
    }
}
export function editBlockLocation(block: Block, newLocation: Locations): Block{
    return {
        ...block,
        location: newLocation,
    }
}

//chars
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
export function editCharsSize(chars: Chars, newSize: Size): Chars{
    return {
        ...chars,
        size: newSize,
    }
}
export function editCharsColor(chars: Chars, newColor: string): Chars{
    return {
        ...chars,
        color: newColor,
    }
}
export function editCharsContent(chars: Chars, newContent: string): Chars{
    return {
        ...chars,
        content: newContent,
    }
}
export function editCharsFontSize(chars: Chars, newfontSize: number): Chars{
    return {
        ...chars,
        fontSize: newfontSize,
    }
}
export function editCharsBold(chars: Chars, newBold: boolean): Chars{
    return {
        ...chars,
        bold: newBold,
    }
}
export function editCharsItalic(chars: Chars, newitalic: boolean): Chars{
    return {
        ...chars,
        italic: newitalic,
    }
}
export function editCharsUnderline(chars: Chars, newUnderline: boolean): Chars{
    return {
        ...chars,
        underline: newUnderline,
    }
}


//picture
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
export function editPictureSize(picture: Picture, newSize: Size): Picture{
    return {
        ...picture,
        size: newSize,
    }
}
export function editPictureFilter(picture: Picture, newFilter: string | null): Picture{
    return {
        ...picture,
        filter: newFilter,
    }
}


//art
export function createArtObject(content: Circle | Rectangle | Triangle): ArtObject{
    return {
        content: content,
        contentType: "artObject"
    };
}

//circle
export function createCircle(): Circle{
    return {
        center: {
            x: 100,
            y: 100
        },
        radius: 100,
        color: "black",
        type: "circle"
    };
}
export function moveCircleCenter(circle: Circle, newCenter: Locations): Circle{
    return {
        ...circle,
        center: newCenter,
    }
}
export function editCircleRadius(circle: Circle, newRadius: number): Circle{
    return {
        ...circle,
        radius: newRadius,
    }
}
export function editCCircleColor(circle: Circle, newColor: string): Circle{
    return {
        ...circle,
        color: newColor,
    }
}

//rectangle
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
export function editRectangleColor(rectangle: Rectangle, newColor: string): Rectangle{
    return {
        ...rectangle,
        color: newColor,
    }
}
export function editRectangleLeftTop(rectangle: Rectangle, newLeftTop: Locations): Rectangle{
    return {
        ...rectangle,
        leftTop: newLeftTop,
    }
}
export function editRectangleRightBottom(rectangle: Rectangle, newrightBottom: Locations): Rectangle{
    return {
        ...rectangle,
        rightBottom: newrightBottom,
    }
} 

//triangle
export function createTriangle(): Triangle{
    return {
        locationPoint1: {
            x: 0,
            y: 100
        },
        locationPoint2: {
            x: 10,
            y: 0
        },
        locationPoint3: {
            x: 200,
            y: 90
        },
        color: "black",
        type: "triangle"
    };
}
export function moveTriangleLocationPoint1(triangle: Triangle, newlocation: Locations): Triangle{
    return {
        ...triangle,
        locationPoint1: newlocation,
    }
}
export function moveTriangleLocationPoint2(triangle: Triangle, newlocation: Locations): Triangle{
    return {
        ...triangle,
        locationPoint2: newlocation,
    }
}
export function moveTriangleLocationPoint3(triangle: Triangle, newlocation: Locations): Triangle{
    return {
        ...triangle,
        locationPoint3: newlocation,
    }
}
export function editTriangleColor(triangle: Triangle, newColor: string): Triangle{
    return {
        ...triangle,
        color: newColor,
    }
}