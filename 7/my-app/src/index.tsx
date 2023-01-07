import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CreateObject } from './tools/CreateObject';
import styles from './index.module.css'
import { CreateTemplates } from './tools/Templates';
import { addChangeEditorHandler, dispatch, getState } from './state';
import { createState, State, setectBlocks } from "./store/functions/funtions";
import { DeleteObjects } from './tools/DeleteObjects';
import { JsxElement } from 'typescript';
import { ExportCard } from './tools/ExportCard';
import { Provider } from 'react-redux';
import { createStoreHook } from 'react-redux/es/exports';
import { createStore, legacy_createStore } from 'redux';
import { addBlockReducer } from './store/reducers/addBlockReduser';
import { configureStore } from '@reduxjs/toolkit'

let state = createState();

const store = configureStore({reducer: addBlockReducer});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function render() {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

render()
