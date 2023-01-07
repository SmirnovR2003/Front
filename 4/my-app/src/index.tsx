import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CreateObject } from './tools/CreateObject';
import styles from './index.module.css'
import { CreateTemplates } from './tools/Templates';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div className={styles.box}>
    <CreateObject />
    <CreateTemplates />
    <App />
  </div>
    
);

