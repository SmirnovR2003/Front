const editor = {
    selectedBlocks: [block2, block3],
    canvas: canvas
}

const canvas = {
    size: {
        width: 255, 
        heigth: 305
    },
    background: 'background1',
    filter: null,
    blocks: [block1, block2, block3]
}


const block1 = {
    background: 'background2',
    location: {
        x: 100,  
        y: 200
    },
    contentType: 'text',
    content: text1
} 

const text1 = {
    size: {
        width: 20, 
        heigth: 30
    },
    color: 'red',
    content: 'abc',
    fontSize: {
        width: 20, 
        heigth: 30
    },
    bold: false,
    italic: false,
    underline: false
}


const block2 = {
    background: 'background2',
    location: {
        x: 100,  
        y: 250
    },
    contentType: 'picture',
    content: picture1
} 

const picture1 = {
    size: {
        width: 200, 
        heigth: 300
    },
    filter: null,
    path: 'picture/cat.png'
}


const block3 = {
    background: 'background2',
    location: {
        x: 150,  
        y: 250
    },
    contentType: 'artObject',
    content: artObject1
} 

const artObject1 = {
    content: circle1,
    contentType: 'circle'   
}

const circle1 = {
    center: [100,  200],
    radius: 100,
    color: 'red'
}