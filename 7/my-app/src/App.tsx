import { useState } from 'react';
import styles from './index.module.css'
import { State } from "./store/functions/funtions";
import { CreateObject } from './tools/CreateObject';
import { CollectingApp } from './objects/CollectingApp';
import { PicturePopup } from './tools/Popups/PicturePopup';
import { useDispatch } from 'react-redux';
import { store } from '.';
import { connect } from 'react-redux';
import { TemplatesPopup } from './tools/Popups/TemplatsePopu';
import { editor1 } from './objects';
import { DownloadPopup } from './tools/Popups/DownloadPopup';
import { CanvasPicturePopup } from './tools/Popups/CanvasPicturePopup';

function mapStateToProps(state:State) {
  return state
};

function App() {
  const [showPicturePopup, setShowPicturePopup] = useState(false)
  const [showCanvasPicturePopup, setShowCanvasPicturePopup] = useState(false)
  const [showTemplatesPopup, setShowTemplatesPopup] = useState(false)
  const [showDownloadPopup, setShowDownloadPopup] = useState(false)

  const [isWindowClicked, setIsWindowClicked] = useState(false)
  const [isWindowClickedForContextMenu, setIsWindowClickedForContextMenu] = useState(false)


  const dispatch = useDispatch()


  return  <div 
            className={styles.box}
            onClick={ e => {
              setIsWindowClickedForContextMenu(!isWindowClickedForContextMenu)
              setIsWindowClicked(!isWindowClicked)
              if(!e.defaultPrevented){
                dispatch({type:"SELECT_BLOCKS", ids: []})
              }
            }}

            onContextMenu={ e => {
              if(!e.defaultPrevented){
                dispatch({type:"SELECT_BLOCKS", ids: []})
                setIsWindowClickedForContextMenu(!isWindowClickedForContextMenu)
                setIsWindowClicked(!isWindowClicked)
              }
            }}
            onKeyDown={ e => {
              if(e.ctrlKey && e.key == 'z'){
                dispatch({type: "PREV_HISTORY"})
                dispatch({type:"SELECT_BLOCKS", ids: []})
                e.preventDefault()
              }
              else if(e.ctrlKey && e.key == 'y'){
                dispatch({type: "CURR_HISTORY"})
                dispatch({type:"SELECT_BLOCKS", ids: []})
                e.preventDefault()
              }
            }}
          >
            {showPicturePopup && <PicturePopup handleClose={setShowPicturePopup} popupState={showPicturePopup} />}
            {showCanvasPicturePopup && <CanvasPicturePopup handleClose={setShowCanvasPicturePopup} popupState={showCanvasPicturePopup} />}
            {showDownloadPopup && <DownloadPopup handleClose={setShowDownloadPopup} popupState={showDownloadPopup} />}
            {showTemplatesPopup && <TemplatesPopup state={store.getState()} handleClose={setShowTemplatesPopup} popupState={showTemplatesPopup} />}
    
            <CreateObject showPicturePopup={setShowPicturePopup} showTemplatesPopup={setShowTemplatesPopup} showDowmloadPopup={setShowDownloadPopup} />
    
            <CollectingApp  
              canvas={store.getState().canvas} 
              scale={1} 
              isTemplate={false} 
              showCanvasPicturePopup={setShowCanvasPicturePopup}
              popupState={showCanvasPicturePopup}
              isWindowClicked={isWindowClicked}
              isWindowClickedForContextMenu={isWindowClickedForContextMenu}
            />
          </div>
}
export default connect(mapStateToProps)(App);
