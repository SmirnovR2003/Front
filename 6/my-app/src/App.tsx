import React, { useRef, useState } from 'react';
import {Text} from './objects/Text'
import {Pictures} from './objects/Picture'
import { ArtObjects } from './objects/ArtObject';
import styles from './index.module.css'
import { currHistory, Editor, prevHistory, setectBlocks } from "./functions/funtions";
import { dispatch } from './state';
import { Resizable } from 're-resizable';
import { ExportCard } from './tools/ExportCard';
import { CreateObject } from './tools/CreateObject';
import { CreateTemplates } from './tools/Templates';
import { DeleteObjects } from './tools/DeleteObjects';
import { CollectingApp } from './objects/CollectingApp';
import { Popup } from './tools/Popups/PopupWindow';

interface IApp {
  editor: Editor
}

function App(props: IApp) {
  const [showPopup, setShowPopup] = useState(false)

  return <div 
    className={styles.box}
    
    onKeyDown={ e => {
      if(e.ctrlKey && e.key == 'z'){
        dispatch(prevHistory, [])
        dispatch(setectBlocks, [])
        e.preventDefault()
      }
      else if(e.ctrlKey && e.key == 'y'){
        dispatch(currHistory, [])
        dispatch(setectBlocks, [])
        e.preventDefault()
      }
    }}
  >
    {showPopup && <Popup handleClose={setShowPopup} popupState={showPopup} />}
    <div>
    <CreateObject showPopup={setShowPopup}  />
    <CreateTemplates />
    <DeleteObjects />
    <ExportCard />
    <CollectingApp editor={props.editor}/>
    </div>
  </div>
}

export default App;
