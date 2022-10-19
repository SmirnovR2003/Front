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
    color: string ,
    size: Size
}

type Size = {
    wigth: number,
    heigth: number
}

type Locations = {
    x: number,
    y: number
}

//editor
function setectBlocks(editor: Editor, newBlocks: Block[]){
    let neweditor: Editor = editor;
    neweditor.slectedBlocks = newBlocks;
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
    newCanvas.blocks.push(block);
    return newCanvas;
} 
function deleteBlock(canvas: Canvas, editor: Editor){
    let newCanvas: Canvas = canvas;
    editor.slectedBlocks.forEach(element => {
        newCanvas.blocks.splice(canvas.blocks.indexOf(element));
    });
    return newCanvas;
} 
function editCanvasSize(canvas: Canvas, newSize: Size){
    let newCanvas: Canvas = canvas;
    newCanvas.size = newSize;
    return newCanvas;
}
function editCanvasBackground(canvas: Canvas, newBackground: string | null){
    let newCanvas: Canvas = canvas;
    newCanvas.background = newBackground;
    return newCanvas;
}
function editCanvasFilter(canvas: Canvas, newFilter: string | null){
    let newCanvas: Canvas = canvas;
    newCanvas.filter = newFilter;
    return newCanvas;
}

//block
function createBlock(content: Chars | Picture | ArtObject, contentType:'text' | 'picture' | 'artObject'){
    return{
        background: null,
        location: [0, 0],
        contentType: contentType,
        content: content
    }
}
function editBlockBackground(editor: Editor, newBackground: string | null){
    let newBlock: Block = editor.slectedBlocks[0];
    newBlock.background = newBackground;
    return newBlock;
}
function editBlockLocation(editor: Editor, newLocation: Locations){
    let newBlock: Block = editor.slectedBlocks[0];
    newBlock.location = newLocation;
    return newBlock;
}

//chars
function editCharsSize(chars: Chars, newSize: Size){
    let newChars: Chars = chars;
    newChars.size = newSize;
    return newChars;
}
function editCharsColor(chars: Chars, newColor: string){
    let newChars: Chars = chars;
    newChars.color = newColor;
    return newChars;
}
function editCharsContent(chars: Chars, newContent: string){
    let newChars: Chars = chars;
    newChars.content = newContent;
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
function editPictureSize(picture: Picture, newSize: Size){
    let newPicture: Picture = picture;
    newPicture.size = newSize;
    return newPicture;
}
function editPictureFilter(picture: Picture, newfilter: string | null){
    let newPicture: Picture = picture;
    newPicture.filter = newfilter;
    return newPicture;
}

//art
function createArtObject(contentType: 'circle' | 'rectangle' | 'triangle' | 'defPicture', content: Circle | Rectangle | Triangle | DefPicture){
    return {
        content: content,
        contentType: contentType
    };
}

//circle
function createCircle(){
    return {
        center: [100, 100],
        radius: 100,
        color: "black"
    };
}
function moveCircleCenter(circle: Circle, newCenter: Locations){
    let newCircle: Circle = circle;
    newCircle.center = newCenter;
    return newCircle;
}
function editCircleRadius(circle: Circle, newRadius: number){
    let newCircle: Circle = circle;
    newCircle.radius = newRadius;
    return newCircle;
}
function editCCircleColor(circle: Circle, newColor: string){
    let newCircle: Circle = circle;
    newCircle.color = newColor;
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
    newRectangle.color = newColor;
    return newRectangle;
}
function editRectangleLeftTop(rectangle: Rectangle, newLeftTop: Locations){
    let newRectangle: Rectangle = rectangle;
    newRectangle.leftTop = newLeftTop;
    return newRectangle;
}
function editRectangleRightBottom(rectangle: Rectangle, newrightBottom: Locations){
    let newRectangle: Rectangle = rectangle;
    newRectangle.rightBottom = newrightBottom;
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
function moveTriangleLocationPoint1(triangle: Triangle, newlocation: Locations){
    let newTriangle: Triangle = triangle;
    newTriangle.locationPoint1 = newlocation;
    return newTriangle;
}
function moveTriangleLocationPoint2(triangle: Triangle, newlocation: Locations){
    let newTriangle: Triangle = triangle;
    newTriangle.locationPoint2 = newlocation;
    return newTriangle;
}
function moveTriangleLocationPoint3(triangle: Triangle, newlocation: Locations){
    let newTriangle: Triangle = triangle;
    newTriangle.locationPoint3 = newlocation;
    return newTriangle;
}
function editTriangleColor(triangle: Triangle, newColor: string){
    let newTriangle: Triangle = triangle;
    newTriangle.color = newColor;
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
    newDefPicture.color = newColor;
    return newDefPicture;
}
function editDefPictureSize(defPicture: DefPicture, newSize: Size){
    let newDefPicture: DefPicture = defPicture;
    newDefPicture.size = newSize;
    return newDefPicture;
}
