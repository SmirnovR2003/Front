import React from 'react';
import './App.css';
import {Text} from './objects/text'
import {Pictures} from './objects/picture'
import { ArtObjects } from './objects/artObject';
import {editor} from './objects'
function App(): JSX.Element {
  return <>{
    editor.canvas.blocks.map(block =>

       (block.content.contentType === 'picture') ?
        <Pictures picture={block.content} key={block.id}></Pictures>

      :(block.content.contentType === 'text') ? 
        <Text char={block.content} key={block.id}></Text>

      :(block.content.contentType === 'artObject') ? 

      (block.content.contentType === 'artObject') ? 
        <ArtObjects artObject={block.content} key={block.id}></ArtObjects>
        :<></>
      :<></>
    )
    }</>
}
export default App;
