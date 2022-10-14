const editor = {
    selectedBlocks: [block2, block3]
}

const canvas = {
    size: [800, 600],
    background: 'background1',
    filter: 'null',
    blocks: [block1, block2, block3]
}


const block1 = {
    background: 'background2',
    location: [100,  200],
    contentType: 'text',
    content: text1
} 

const text1 = {
    font: ['default', [20, 30]],
    color: 'red',
    content: 'abc'
}


const block2 = {
    background: 'background2',
    location: [100,  200],
    contentType: 'picture',
    content: picture1
} 

const picture1 = {
    size: [400, 300],
    filter: 'null',
    path: 'picture/cat.png'
}


const block3 = {
    background: 'background2',
    location: [100,  200],
    contentType: 'artObject',
    content: artObject1
} 

const artObject1 = {
    content: circle1   
}

const circle1 = {
    center: [100,  200],
    radius: 100,
    color: 'red'
}