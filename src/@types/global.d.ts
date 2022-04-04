import CodeMirror from 'codemirror';
import { CompositeDisposable, Disposable } from 'event-kit';

declare global {
  const inkdrop: {
    commands: Commands;
    getActiveEditor: () => Editor | undefined;
    isEditorActive: () => boolean;
    onEditorLoad: (callback: EditorCallback) => Disposable;
    onEditorUnload: (callback: EditorCallback) => Disposable;
  };
}

type Editor = {
  cm: CodeMirror.Editor;
};

type Commands = {
  add: (
    element: HTMLElement,
    handlers: Record<string, () => void>
  ) => CompositeDisposable;
};

type EditorCallback = (editor: Editor) => any;
