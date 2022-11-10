export type Editor = {
    selectedBlocks: Block[],
    canvas: Canvas,
    history: Canvas[]
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
    id: number
} 

export type Chars = {
    contentType: 'text',
    size: Size,
    color: string,
    content: string,
    fontSize: Size,
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
    content: Circle | Rectangle | Triangle | DefPicture
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

export type DefPicture = {
    path: string,
    color: string ,
    size: Size,
    type: 'defPicture'
} 


export type Size = {
    width: number,
    heigth: number
}

export type Locations = {
    x: number,
    y: number
}

//editor
function setectBlocks(editor: Editor, newBlocks: Block[]): Editor {
    return {
        ...editor,
        selectedBlocks: newBlocks,
    }
}

// canvas
function createCanvas(editor: Editor): Editor{
    let canvas = {
        size: {
            width: 800, 
            heigth: 600
        },
        background: null,
        filter: null,
        blocks: []
    };
    return {
        ...editor,
        canvas: canvas,
    }
} 
function addBlock(canvas: Canvas, block: Block): Canvas{
    return {
        ...canvas,
        blocks: [...canvas.blocks, block]
    }

} 
function deleteBlock(canvas: Canvas, block: Block): Canvas {
    return {
        ...canvas,
        blocks: canvas.blocks.filter(element => element != block)
    };
} 
function editCanvasSize(canvas: Canvas, newSize: Size): Canvas{
    return {
        ...canvas,
        size: newSize,
    }

}
function editCanvasBackground(canvas: Canvas, newBackground: string | null): Canvas{
    return {
        ...canvas,
        background: newBackground,
    }
}
function editCanvasFilter(canvas: Canvas, newFilter: string | null): Canvas{
    return {
        ...canvas,
        filter: newFilter,
    }
}

//block
function createBlock(content: Chars | Picture | ArtObject, id: number): Block{
    return {
        background: null,
        location: {
            x: 0, 
            y: 0
        },
        content: content,
        id:id
    }
}
function editBlockBackground(block: Block, newBackground: string | null): Block{
    return {
        ...block,
        background: newBackground,
    }
}
function editBlockLocation(block: Block, newLocation: Locations): Block{
    return {
        ...block,
        location: newLocation,
    }
}

//chars
function createChars(): Chars{
    return {
        contentType: 'text',
        size: {
            width: 100, 
            heigth: 100,
        },
        color: 'black',
        content: '',
        fontSize: {
            width: 100, 
            heigth: 100,
        },
        bold: false,
        italic: false,
        underline: false
    };
}
function editCharsSize(chars: Chars, newSize: Size): Chars{
    return {
        ...chars,
        size: newSize,
    }
}
function editCharsColor(chars: Chars, newColor: string): Chars{
    return {
        ...chars,
        color: newColor,
    }
}
function editCharsContent(chars: Chars, newContent: string): Chars{
    return {
        ...chars,
        content: newContent,
    }
}
function editCharsFontSize(chars: Chars, newfontSize: Size): Chars{
    return {
        ...chars,
        fontSize: newfontSize,
    }
}
function editCharsBold(chars: Chars, newBold: boolean): Chars{
    return {
        ...chars,
        bold: newBold,
    }
}
function editCharsItalic(chars: Chars, newitalic: boolean): Chars{
    return {
        ...chars,
        italic: newitalic,
    }
}
function editCharsUnderline(chars: Chars, newUnderline: boolean): Chars{
    return {
        ...chars,
        underline: newUnderline,
    }
}

//picture
function createPicture(path: string): Picture{
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
function editPictureSize(picture: Picture, newSize: Size): Picture{
    return {
        ...picture,
        size: newSize,
    }
}
function editPictureFilter(picture: Picture, newFilter: string | null): Picture{
    return {
        ...picture,
        filter: newFilter,
    }
}

//art
function createArtObject(content: Circle | Rectangle | Triangle | DefPicture): ArtObject{
    return {
        content: content,
        contentType: "artObject"
    };
}

//circle
function createCircle(): Circle{
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
function moveCircleCenter(circle: Circle, newCenter: Locations): Circle{
    return {
        ...circle,
        center: newCenter,
    }
}
function editCircleRadius(circle: Circle, newRadius: number): Circle{
    return {
        ...circle,
        radius: newRadius,
    }
}
function editCCircleColor(circle: Circle, newColor: string): Circle{
    return {
        ...circle,
        color: newColor,
    }
}

//rectangle
function createRectangle(): Rectangle{
    return {
        leftTop: {
            x: 0,
            y: 0
        },
        rightBottom: {
            x: 10,
            y: 10
        },
        color: "black",
        type: "rectangle"
    };
}
function editRectangleColor(rectangle: Rectangle, newColor: string): Rectangle{
    return {
        ...rectangle,
        color: newColor,
    }
}
function editRectangleLeftTop(rectangle: Rectangle, newLeftTop: Locations): Rectangle{
    return {
        ...rectangle,
        leftTop: newLeftTop,
    }
}
function editRectangleRightBottom(rectangle: Rectangle, newrightBottom: Locations): Rectangle{
    return {
        ...rectangle,
        rightBottom: newrightBottom,
    }
} 

//triangle
function createTriangle(): Triangle{
    return {
        locationPoint1: {
            x: 105,
            y: 105
        },
        locationPoint2: {
            x: 10,
            y: 10
        },
        locationPoint3: {
            x: 100,
            y: 100
        },
        color: "black",
        type: "triangle"
    };
}
function moveTriangleLocationPoint1(triangle: Triangle, newlocation: Locations): Triangle{
    return {
        ...triangle,
        locationPoint1: newlocation,
    }
}
function moveTriangleLocationPoint2(triangle: Triangle, newlocation: Locations): Triangle{
    return {
        ...triangle,
        locationPoint2: newlocation,
    }
}
function moveTriangleLocationPoint3(triangle: Triangle, newlocation: Locations): Triangle{
    return {
        ...triangle,
        locationPoint3: newlocation,
    }
}
function editTriangleColor(triangle: Triangle, newColor: string): Triangle{
    return {
        ...triangle,
        color: newColor,
    }
}

//defPicture
function createDefPicture(path: string): DefPicture{
    return {
        path: path,
        color: "black",
        size: {
            width: 100,
            heigth: 100
        },
        type: "defPicture"
    };
}
function editDefPictureColor(defPicture: DefPicture, newColor: string): DefPicture{
    return {
        ...defPicture,
        color: newColor,
    }
}
function editDefPictureSize(defPicture: DefPicture, newSize: Size): DefPicture{
    return {
        ...defPicture,
        size: newSize,
    }
}
