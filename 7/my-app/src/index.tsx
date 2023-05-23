
import ReactDOM from 'react-dom/client';
import App from './App';
import { createState } from "./store/functions/funtions";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Reducer } from './store/reducers/Reducer';

import * as initialState from './templates.json'

const state = createState([initialState[0], initialState[1], initialState[2] ]);

export const store = createStore(Reducer, state);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export function render() {
  console.log(store.getState().templates)
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
render()
const unsubscribe = store.subscribe(render)
unsubscribe()

