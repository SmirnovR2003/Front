import { addToHistory, Block, createBlock, State, prevHistory } from "./store/functions/funtions"
import { editor1 } from "./objects";

const KEY = 'editor'

let editor: State = getEditorFromStorage()
let changeEditorHandler: Function = () => {}

function getState(): State {
    return editor
}

function setState(newEditor: State) {
    editor = newEditor
    changeEditorHandler(editor)
    setEditorToStorage()
}

export function getElementById(id: string): Block | null{
    let block: Block | null = null
    editor.canvas.blocks.forEach( e => {
        if(e.id === id) block = e
    })
    return block
}
function dispatch(modifyFn: Function, payload: any) {
    if(payload[0] === 'addToHistory') {
        setState(modifyFn(editor, payload))
        setState(addToHistory(editor))
    }
    else{
        setState(modifyFn(editor, payload))
    }
    console.log(editor)
}

function addChangeEditorHandler(handler: Function) {
    changeEditorHandler = handler
}

function setEditorToStorage() {
    window.localStorage.setItem(KEY, JSON.stringify(editor))
}

function getEditorFromStorage(): State {
    const editor = window.localStorage.getItem(KEY)
    return editor ? JSON.parse(editor) : []
}

export {
    getState,
    dispatch,
    addChangeEditorHandler,
}