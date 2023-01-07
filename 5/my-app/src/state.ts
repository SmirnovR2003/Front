import { Editor } from "./funtions"

const KEY = 'editor'

let editor: Editor = getEditorFromStorage();
let changeEditorHandler: Function = () => {}

function getState(): Editor {
    return editor
}

function setState(newEditor: Editor) {
    editor = newEditor
    changeEditorHandler(editor)
    setEditorToStorage()
}

function dispatch(modifyFn: Function, payload: Object) {
    setState(modifyFn(editor, payload))
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