type Editor = {
    slectedBlocks: Block[],
    canvas: Canvas
}

type Canvas = {
    size: Size,
    background: string | null,
    filter: string | null,
    blocks: Block[]
}

type Block = {
    background: string | null,
    location: Locations,
    contentType: 'text' | 'picture' | 'artObject',
    content: Chars | Picture | ArtObject
} 

type Chars = {
    size: Size,
    color: string,
    content: string
}

type Picture = {
    size: Size,
    filter: string | null,
    path: string
}

type ArtObject = {
    content: Circle | Rectangle | Triangle | DefPicture,
    contentType: 'circle' | 'rectangle' | 'triangle' | 'defPicture'
}

type Circle = {
    center: Locations,
    radius: number,
    color: string    
}

type Rectangle = {
    leftTop: Locations,
    rightBottom: Locations,
    color: string     
}

type Triangle = {
    locationPoint1: Locations, 
    locationPoint2: Locations,
    locationPoint3: Locations,
    color: string 
}

type DefPicture = {
    path: string,
    color: string,
    size: Size
}

type Size = {
    width: number,
    heigth: number
}

type Locations = {
    x: number,
    y: number
}


//editor
function setectBlocks(editor: Editor, newBlocks: Block[]){
    let neweditor: Editor = editor;
    return neweditor;
}

// canvas
function createCanvas(){
    let canvas: Canvas = {
        size: {
            width: 800, 
            heigth: 600
        },
        background: null,
        filter: null,
        blocks: []
    };
    return canvas;
} 
function addBlock(canvas: Canvas, block: Block){
    let newCanvas: Canvas = canvas;
    return newCanvas;
} 
function deleteBlock(canvas: Canvas, editor: Editor){
    let newCanvas: Canvas = canvas;
    return newCanvas;
} 
function editCanvasSize(canvas: Canvas, newSize: Size){
    let newCanvas: Canvas = canvas;
    return newCanvas;
}
function editCanvasBackground(canvas: Canvas, newBackground: string | null){
    let newCanvas: Canvas = canvas;
    return newCanvas;
}
function editCanvasFilter(canvas: Canvas, newFilter: string | null){
    let newCanvas: Canvas = canvas;
    return newCanvas;
}

//block
function createBlock(content: Chars | Picture | ArtObject, contentType:'text' | 'picture' | 'artObject'){
    let newBlock: Block = {
        background: null,
        location: {
            x: 0, 
            y: 0
        },
        contentType: contentType,
        content: content
    }
    return 
}
function editBlockBackground(editor: Editor, newBackground: string | null){
    let newBlock: Block = editor.slectedBlocks[0];
    return newBlock;
}
function editBlockLocation(editor: Editor, newLocation: Locations){
    let newBlock: Block = editor.slectedBlocks[0];
    return newBlock;
}

//chars
function editCharsSize(chars: Chars, newSize: Size){
    let newChars: Chars = chars;
    return newChars;
}
function editCharsColor(chars: Chars, newColor: string){
    let newChars: Chars = chars;
    return newChars;
}
function editCharsContent(chars: Chars, newContent: string){
    let newChars: Chars = chars;
    return newChars;
}

//picture
function createPicture(path: string){
    let newPicture: Picture = {
        size: {
            width: 100, 
            heigth: 100,
        },
        filter: null,
        path: path
    };
    return newPicture;
}
function editPictureSize(picture: Picture, newSize: Size){
    let newPicture: Picture = picture;
    return newPicture;
}
function editPictureFilter(picture: Picture, newfilter: string | null){
    let newPicture: Picture = picture;
    return newPicture;
}

//art
function createArtObject(contentType: 'circle' | 'rectangle' | 'triangle' | 'defPicture', content: Circle | Rectangle | Triangle | DefPicture){
    let newArtObject: ArtObject = {
        content: content,
        contentType: contentType
    };
    return newArtObject;
}

//circle
function createCircle(){
    let newCircle: Circle = {
        center: {
            x: 100,
            y: 100
        },
        radius: 100,
        color: "black"
    };
    return newCircle;
}
function moveCircleCenter(circle: Circle, newCenter: Locations){
    let newCircle: Circle = circle;
    return newCircle;
}
function editCircleRadius(circle: Circle, newRadius: number){
    let newCircle: Circle = circle;
    return newCircle;
}
function editCCircleColor(circle: Circle, newColor: string){
    let newCircle: Circle = circle;
    return newCircle;
}

//rectangle
function createRectangle(){
    let newRectangle: Rectangle = {
        leftTop: {
            x: 0,
            y: 0
        },
        rightBottom: {
            x: 10,
            y: 10
        },
        color: "black"
    };
    return newRectangle
}
function editRectangleColor(rectangle: Rectangle, newColor: string){
    let newRectangle: Rectangle = rectangle;
    return newRectangle;
}
function editRectangleLeftTop(rectangle: Rectangle, newLeftTop: Locations){
    let newRectangle: Rectangle = rectangle;
    return newRectangle;
}
function editRectangleRightBottom(rectangle: Rectangle, newrightBottom: Locations){
    let newRectangle: Rectangle = rectangle;
    return newRectangle;
} 

//triangle
function createTriangle(){
    let newTriangle: Triangle = {
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
        color: "black"
    };
    return newTriangle
}
function moveTriangleLocationPoint1(triangle: Triangle, newlocation: Locations){
    let newTriangle: Triangle = triangle;
    return newTriangle;
}
function moveTriangleLocationPoint2(triangle: Triangle, newlocation: Locations){
    let newTriangle: Triangle = triangle;
    return newTriangle;
}
function moveTriangleLocationPoint3(triangle: Triangle, newlocation: Locations){
    let newTriangle: Triangle = triangle;
    return newTriangle;
}
function editTriangleColor(triangle: Triangle, newColor: string){
    let newTriangle: Triangle = triangle;
    return newTriangle;
}

//defPicture
function createDefPicture(path: string){
    let newDefPicture: DefPicture = {
    path: path,
    color: "black",
    size: {
        width: 100,
        heigth: 100
    }
    };
    return newDefPicture
}
function editDefPictureColor(defPicture: DefPicture, newColor: string){
    let newDefPicture: DefPicture = defPicture;
    return newDefPicture;
}
function editDefPictureSize(defPicture: DefPicture, newSize: Size){
    let newDefPicture: DefPicture = defPicture;
    return newDefPicture;
}
