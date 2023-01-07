import React from 'react';
import {Text} from './objects/Text'
import {Pictures} from './objects/Picture'
import { ArtObjects } from './objects/ArtObject';
import {editor} from './objects'
import styles from './App.module.css'

function App() {
  return <div style={{width: editor.canvas.size.width, height: editor.canvas.size.heigth}} className={styles.box} >{
    editor.canvas.blocks.map(block =>{
      switch (block.content.contentType) {
        case "picture":
          return <Pictures picture={block.content} key={block.id} position={block.location} zIndex={block.zIndex} ></Pictures>
  
        case "text":
          return <Text char={block.content} key={block.id} position={block.location} zIndex={block.zIndex} ></Text>
  
        case "artObject": 
          return <ArtObjects artObject={block.content} key={block.id} position={block.location} zIndex={block.zIndex} ></ArtObjects>
          
        default:
          return null;
      }
    })
  }</div>
}

export default App;
