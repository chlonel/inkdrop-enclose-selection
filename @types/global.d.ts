import CodeMirror from 'codemirror';
import { Disposable } from 'event-kit';

declare global {
  var inkdrop: {
    getActiveEditor: () => Editor;
    isEditorActive: () => boolean;
    onEditorLoad: (callback: EditorCallback) => Disposable;
    onEditorUnload: (callback: EditorCallback) => Disposable;
  };
}

type Editor = {
  cm: CodeMirror.Editor;
};

type EditorCallback = (editor: Editor) => any;
