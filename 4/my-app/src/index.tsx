import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {editor} from './objects'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div align_content style={{display: 'flex', alignContent: 'center'}}>
    <App />
  </div>
    
);

