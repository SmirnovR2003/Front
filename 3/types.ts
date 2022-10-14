type Editor = {
    slectedBlocks: Block[]
}

type Canvas = {
    size: number[],
    background: string,
    filter: string,
    blocks: Block[]
}

type Block = {
    background: string,
    location: number[],
    contentType: string,
    content: Chars | Picture | ArtObject
} 

type Chars = {
    size: number[],
    color: string,
    content: string
}

type Picture = {
    size: number[],
    filter: string,
    path: string
}

type ArtObject = {
    content: Circle | Rectangle | Triangle | DefPicture,
    contentType: string
}

type Circle = {
    center: number[],
    radius: number,
    color: string    
}

type Rectangle = {
    leftTop: number[],
    rightBottom: number[],
    color: string     
}

type Triangle = {
    locationPoint1: number[], 
    locationPoint2: number[],
    locationPoint3: number[],
    color: string 
}

type DefPicture = {
    path: string,
    color: string ,
    size: number[]
}


//editor
function editEditor(editor: Editor, newBlocks: Block[]){
    let neweditor: Editor = editor;
    return neweditor;
}

// canvas
function createCanvas(){
    return {
        size: [800, 600],
        background: "null",
        filter: "null",
        blocks: []
    };
} 
function addBlock(canvas: Canvas, block: Block){
    let newCanvas: Canvas = canvas;
    return newCanvas;
} 
function deleteBlock(canvas: Canvas, block: Block){
    let newCanvas: Canvas = canvas;
    return newCanvas;
} 
function editCanvasSize(canvas: Canvas, newSize: number[]){
    let newCanvas: Canvas = canvas;
    return newCanvas;
}
function editCanvasBackground(canvas: Canvas, newBackground: string){
    let newCanvas: Canvas = canvas;
    return newCanvas;
}
function editCanvasFilter(canvas: Canvas, newFilter: string){
    let newCanvas: Canvas = canvas;
    return newCanvas;
}

//block
function createBlock(content: Chars | Picture | ArtObject,){
    return{
        background: "null",
        location: [0, 0],
        contentType: typeof content,
        content: content
    }
}
function editBlockBackground(block: Block, newBackground: string){
    let newBlock: Block = block;
    return newBlock;
}
function editBlockLocation(block: Block, newLocation: number[]){
    let newBlock: Block = block;
    return newBlock;
}

//chars
function editCharsSize(chars: Chars, newSize: number[]){
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
    return {
        size: [100, 100],
        filter: "null",
        path: path
    };
}
function editPictureSize(picture: Picture, newSize: number[]){
    let newPicture: Picture = picture;
    return newPicture;
}
function editPictureFilter(picture: Picture, newfilter: string){
    let newPicture: Picture = picture;
    return newPicture;
}

//art
function createArtObject(artObject: ArtObject, contentType: string, content: Circle | Rectangle | Triangle | DefPicture){
    return {
        content: content,
        contentType: contentType
    };
}

//circle
function createCircle(path: string){
    return {
        size: [100, 100],
        filter: "null",
        path: path
    };
}
function moveCircleCenter(circle: Circle, newCenter: number[]){
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
    return {
        lefTop: [0, 0],
        rightBottom: [10, 10],
        color: "black"
    };
}
function editRectangleColor(rectangle: Rectangle, newColor: string){
    let newRectangle: Rectangle = rectangle;
    return newRectangle;
}
function editRectangleLeftTop(rectangle: Rectangle, newLeftTop: number[]){
    let newRectangle: Rectangle = rectangle;
    return newRectangle;
}
function editRectangleRightBottom(rectangle: Rectangle, newrightBottom: number[]){
    let newRectangle: Rectangle = rectangle;
    return newRectangle;
} 

//triangle
function createTriangle(){
    return {
        locationPoint1: [100, 100],
        locationPoint2: [0, 0],
        locationPoint3: [10, 10],
        color: "black"
    };
}
function moveTriangleLocationPoint1(triangle: Triangle, newlocation: number[]){
    let newTriangle: Triangle = triangle;
    return newTriangle;
}
function moveTriangleLocationPoint2(triangle: Triangle, newlocation: number[]){
    let newTriangle: Triangle = triangle;
    return newTriangle;
}
function moveTriangleLocationPoint3(triangle: Triangle, newlocation: number[]){
    let newTriangle: Triangle = triangle;
    return newTriangle;
}
function editTriangleColor(triangle: Triangle, newColor: string){
    let newTriangle: Triangle = triangle;
    return newTriangle;
}

//defPicture
function createDefPicture(path: string){
    return {
        path: path,
        color: "black",
        size: [100, 100]
    };
}
function editDefPictureColor(defPicture: DefPicture, newColor: string){
    let newDefPicture: DefPicture = defPicture;
    return newDefPicture;
}
function editDefPictureSize(defPicture: DefPicture, newSize: number[]){
    let newDefPicture: DefPicture = defPicture;
    return newDefPicture;
}
