export type State = {
    selectedBlocks: Block[],
    canvas: Canvas,
    history: Canvas[],
    templates: Canvas[],
    historyIndex: number
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
    content: Ellipse | Rectangle | Triangle
}
export type Ellipse = {
    center: Locations,
    radiusX: number,
    radiusY: number,
    color: string,
    type: 'ellipse'   
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

//State
export function setectBlocks(State: State, ids: string[]): State {
    return {
        ...State,
        selectedBlocks: State.canvas.blocks.filter(element => {for (let id of ids){
            if(element.id === id){
                return true;
            }
            return false;
        }}),
    }
}
export function createState(): State{
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
        history: [{
            size: {
                width: 800,
                heigth: 600
            },
            background: null,
            filter: null,
            blocks: []
        }],
        templates:[],
        historyIndex: 0
    }
} 

export function deleteAllBlocks(State:State): State{
    return {
        ...State,
        canvas: {
            size: State.canvas.size,
            background: State.canvas.background,
            filter: State.canvas.filter,
            blocks: [],
        },
        selectedBlocks: []
    }
} 

//history

export function addToHistory(State: State): State{
    let count = 0;
    return{
        ...State,
        history: [...State.history.filter(e =>{
            if (count <= State.historyIndex){
                count++
                return e
            }
        }), State.canvas],
        historyIndex: count
    }
}

export function prevHistory(State: State){
    if(State.historyIndex > 0){
        return{
            ...State,
            canvas: State.history[State.historyIndex - 1],
            historyIndex: State.historyIndex - 1
        }

    }
    else{
        return{
            ...State
        }
    }
}

export function currHistory(State: State){
    console.log(State)
    if(State.historyIndex == State.history.length - 1){
        return{
            ...State
        }

    }
    else{
        return{
            ...State,
            canvas: State.history[State.historyIndex + 1],
            historyIndex: State.historyIndex + 1
        }
    }
}

// canvas
export function createCanvas(State: State): State{
    return {
        ...State,
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
export function deleteBlocks(State: State): State {
    return {
        ...State,
        canvas: {
            blocks: State.canvas.blocks.filter(element => {    
                if(State.selectedBlocks.length === 0) return true
                for (let item of State.selectedBlocks){
                    if(element.id === item.id){
                        return false;
                    }
                }
                return true;
            }),
            size: State.canvas.size,
            background: State.canvas.background,
            filter: State.canvas.filter
        },
        selectedBlocks: []
    };
} 
export function editCanvasSize(State: State, payload: any): State{
    return {
        ...State,
        canvas: {
            ...State.canvas,
            size: payload[1],
        }
    }

}
export function editCanvasBackground(State: State, payload: any): State{
    return {
        ...State,
        canvas: {
            ...State.canvas,
            background: payload[1],
        }
    }
}
export function editCanvasFilter(State: State, payload: any): State{
    return {
        ...State,
        canvas: {
            ...State.canvas,
            filter: payload[1],
        }
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
export function editBlockBackground(State: State, payload: any): State{
    return {
        ...State,
        canvas:{
            ...State.canvas,
            blocks: State.canvas.blocks.map((e) =>{ 
                if(payload[1] === e.id){
                    return {
                        ...e,
                        background: payload[2],
                    }
                }
                return e
            })
        }
    }
}
export function editBlockLocation(State: State, payload: any): State {
    return {
        ...State,
        canvas:{
            ...State.canvas,
            blocks: State.canvas.blocks.map((e) =>{ 
                if(payload[1] === e.id){
                    return {
                        ...e,
                        location: {
                            x: payload[2].x,
                            y: payload[2].y
                        },
                    }
                }
                return e
            })
        }
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
export function editCharsSize(State: State, payload: any): State{
    return {
        ...State,
        canvas:{
            ...State.canvas,
            blocks: State.canvas.blocks.map((e) =>{ 
                if(payload[1] === e.id){
                    if(e.content.contentType === 'text')
                    return {
                        ...e,
                        content:{
                            ...e.content,
                            size: {
                                width: payload[2].dw,
                                heigth: payload[2].dh
                            }
                        }
                    }
                }
                return e
            })
        }
    }
}
export function editCharsColor(State: State, payload: any): State{
    return {
        ...State,
        canvas:{
            ...State.canvas,
            blocks: State.canvas.blocks.map((e) =>{ 
                if(payload[1] === e.id){
                    if(e.content.contentType === 'text')
                    return {
                        ...e,
                        content:{
                            ...e.content,
                            color: payload[2]
                        }
                    }
                }
                return e
            })
        }
    }
}
export function editCharsContent(State: State, payload: any): State{
    return {
        ...State,
        canvas:{
            ...State.canvas,
            blocks: State.canvas.blocks.map((e) =>{ 
                if(payload[1] === e.id){
                    if(e.content.contentType === 'text')
                    return {
                        ...e,
                        content:{
                            ...e.content,
                            content: payload[2]
                        }
                    }
                }
                return e
            })
        }
    }
}
export function editCharsFontSize(State: State, payload: any): State{
    return {
        ...State,
        canvas:{
            ...State.canvas,
            blocks: State.canvas.blocks.map((e) =>{ 
                if(payload[1] === e.id){
                    if(e.content.contentType === 'text')
                    return {
                        ...e,
                        content:{
                            ...e.content,
                            fontSize: payload[2]
                        }
                    }
                }
                return e
            })
        }
    }
}
export function editCharsBold(State: State, payload: any): State{
    return {
        ...State,
        canvas:{
            ...State.canvas,
            blocks: State.canvas.blocks.map((e) =>{ 
                if(payload[1] === e.id){
                    if(e.content.contentType === 'text')
                    return {
                        ...e,
                        content:{
                            ...e.content,
                            bold: payload[2]
                        }
                    }
                }
                return e
            })
        }
    }
}
export function editCharsItalic(State: State, payload: any): State{
    return {
        ...State,
        canvas:{
            ...State.canvas,
            blocks: State.canvas.blocks.map((e) =>{ 
                if(payload[1] === e.id){
                    if(e.content.contentType === 'text')
                    return {
                        ...e,
                        content:{
                            ...e.content,
                            italic: payload[2]
                        }
                    }
                }
                return e
            })
        }
    }
}
export function editCharsUnderline(State: State, payload: any): State{
    return {
        ...State,
        canvas:{
            ...State.canvas,
            blocks: State.canvas.blocks.map((e) =>{ 
                if(payload[1] === e.id){
                    if(e.content.contentType === 'text')
                    return {
                        ...e,
                        content:{
                            ...e.content,
                            underline: payload[2]
                        }
                    }
                }
                return e
            })
        }
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
export function editPictureSize(State: State, payload: any): State{
    console.log(payload)
    return {
        ...State,
        canvas:{
            ...State.canvas,
            blocks: State.canvas.blocks.map((e) =>{ 
                if(payload[1] === e.id){
                    if(e.content.contentType === 'picture')
                    return {
                        ...e,
                        content:{
                            ...e.content,
                            size: {
                                width: payload[2].dw, 
                                heigth: payload[2].dh
                            }
                        }
                    }
                }
                return e
            })
        }
    }
}
export function editPictureFilter(State: State, payload: any): State{
    return {
        ...State,
        canvas:{
            ...State.canvas,
            blocks: State.canvas.blocks.map((e) =>{ 
                if(payload[1] === e.id){
                    if(e.content.contentType === 'picture')
                    return {
                        ...e,
                        content:{
                            ...e.content,
                            filter: payload[2]
                        }
                    }
                }
                return e
            })
        }
    }
}


//art
export function createArtObject(content: Ellipse | Rectangle | Triangle): ArtObject{
    return {
        content: content,
        contentType: "artObject"
    };
}

//ellipse
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
export function editEllipseSize(State: State, payload: any): State{
    return {
        ...State,
        canvas:{
            ...State.canvas,
            blocks: State.canvas.blocks.map((e) =>{ 
                if(payload[1] === e.id){
                    if(e.content.contentType === 'artObject')
                    if(e.content.content.type === 'ellipse')
                    return {
                        ...e,
                        content:{
                            ...e.content,
                            content:{
                                ...e.content.content,
                                radiusX: payload[2].dw,
                                radiusY: payload[2].dh
                            }
                        }
                    }
                }
                return e
            })
        }
    }
}
export function editCircleColor(State: State, payload: any): State{
    return {
        ...State,
        canvas:{
            ...State.canvas,
            blocks: State.canvas.blocks.map((e) =>{ 
                if(payload[1] === e.id){
                    if(e.content.contentType === 'artObject')
                    if(e.content.content.type === 'ellipse')
                    return {
                        ...e,
                        content:{
                            ...e.content,
                            content:{
                                ...e.content.content,
                                color: payload[2]
                            }
                        }
                    }
                }
                return e
            })
        }
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
export function editRectangleColor(State: State, payload: any): State{
    return {
        ...State,
        canvas:{
            ...State.canvas,
            blocks: State.canvas.blocks.map((e) =>{ 
                if(payload[1] === e.id){
                    if(e.content.contentType === 'artObject')
                    if(e.content.content.type === 'rectangle')
                    return {
                        ...e,
                        content:{
                            ...e.content,
                            content:{
                                ...e.content.content,
                                color: payload[2]
                            }
                        }
                    }
                }
                return e
            })
        }
    }
}

export function editRectangleRightBottom(State: State, payload: any): State{
    return {
        ...State,
        canvas:{
            ...State.canvas,
            blocks: State.canvas.blocks.map((e) =>{ 
                if(payload[1] === e.id){
                    if(e.content.contentType === 'artObject')
                    if(e.content.content.type === 'rectangle')
                    return {
                        ...e,
                        content:{
                            ...e.content,
                            content:{
                                ...e.content.content,
                                rightBottom: {
                                    x: payload[2].dw,
                                    y: payload[2].dh
                                }
                            }
                        }
                    }
                }
                return e
            })
        }
    }
} 

//triangle
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
export function moveTriangleLocationPoints(State: State, payload: any): State{
    return {
        ...State,
        canvas:{
            ...State.canvas,
            blocks: State.canvas.blocks.map((e) =>{ 
                if(payload[1] === e.id){
                    if(e.content.contentType === 'artObject')
                    if(e.content.content.type === 'triangle')
                    return {
                        ...e,
                        content:{
                            ...e.content,
                            content:{
                                ...e.content.content,
                                locationPoint1: {
                                    x: payload[2].x1,
                                    y: payload[2].y1
                                },
                                locationPoint2: {
                                    x: payload[2].x2,
                                    y: payload[2].y2
                                },
                                locationPoint3: {
                                    x: payload[2].x3,
                                    y: payload[2].y3
                                }
                            }
                        }
                    }
                }
                return e
            })
        }
    }
}
export function editTriangleColor(State: State, payload: any): State{
    return {
        ...State,
        canvas:{
            ...State.canvas,
            blocks: State.canvas.blocks.map((e) =>{ 
                if(payload[1] === e.id){
                    if(e.content.contentType === 'artObject')
                    if(e.content.content.type === 'triangle')
                    return {
                        ...e,
                        content:{
                            ...e.content,
                            content:{
                                ...e.content.content,
                                color: payload[2]
                            }
                        }
                    }
                }
                return e
            })
        }
    }
}