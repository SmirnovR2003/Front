import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CreateObject } from './tools/CreateObject';
import styles from './index.module.css'
import { CreateTemplates } from './tools/Templates';
import { addChangeEditorHandler, getState } from './state';
import { Editor } from './funtions';
import { DeleteObjects } from './tools/DeleteObjects';
import { PopupWindow } from './tools/PopupWindow';
import { JsxElement } from 'typescript';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function render(editor:Editor) {
  let activePopup = false
  function setActive(active: boolean){
    console.log(active)
    activePopup = active
  }
  root.render(
    <div className={styles.box}>
      <CreateObject setActive={setActive} />
      <CreateTemplates />
      <DeleteObjects />
      <App editor={editor}/>
      <PopupWindow setActive={setActive} type='' active={activePopup}></PopupWindow>
    </div>
  );
  return ;
}

addChangeEditorHandler(render)
render(getState())

