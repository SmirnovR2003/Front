import { addToHistory, Block, createBlock, Editor, prevHistory } from "./functions/funtions"
import { editor1 } from "./objects";

const KEY = 'editor'

let editor: Editor = getEditorFromStorage()
let changeEditorHandler: Function = () => {}

function getState(): Editor {
    return editor
}

function setState(newEditor: Editor) {
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

function getEditorFromStorage(): Editor {
    const editor = window.localStorage.getItem(KEY)
    return editor ? JSON.parse(editor) : []
}

export {
    getState,
    dispatch,
    addChangeEditorHandler,
}