import React, { useRef, useState } from 'react';
import {Text} from './objects/Text'
import {Pictures} from './objects/Picture'
import { ArtObjects } from './objects/ArtObject';
import styles from './index.module.css'
import { currHistory, prevHistory, setectBlocks, State } from "./store/functions/funtions";
import { dispatch } from './state';
import { Resizable } from 're-resizable';
import { ExportCard } from './tools/ExportCard';
import { CreateObject } from './tools/CreateObject';
import { CreateTemplates } from './tools/Templates';
import { DeleteObjects } from './tools/DeleteObjects';
import { CollectingApp } from './objects/CollectingApp';
import { Popup } from './tools/Popups/PopupWindow';
import { useSelector } from 'react-redux';

function App() {
  const [showPopup, setShowPopup] = useState(false)

  let state = useSelector(state =>  {return state})

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
    <CollectingApp editor={state}/>
    </div>
  </div>
}

export default App;
