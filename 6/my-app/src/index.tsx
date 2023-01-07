import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CreateObject } from './tools/CreateObject';
import styles from './index.module.css'
import { CreateTemplates } from './tools/Templates';
import { addChangeEditorHandler, dispatch, getState } from './state';
import { Editor, setectBlocks } from "./functions/funtions";
import { DeleteObjects } from './tools/DeleteObjects';
import { JsxElement } from 'typescript';
import { ExportCard } from './tools/ExportCard';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function render(editor:Editor) {
  root.render(
    <App editor={editor}/>
  );
}

addChangeEditorHandler(render)
render(getState())

