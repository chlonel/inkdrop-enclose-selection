import { Disposable } from 'event-kit';
import { Editor } from './editor';

let disposable: Disposable | null = null;
let editor: Editor | null = null;

const waitEditorLoad = async () => {
  if (!inkdrop.isEditorActive()) {
    await new Promise(resolve => inkdrop.onEditorLoad(resolve));
  }
};

export const activate = async () => {
  await waitEditorLoad();
  const { cm } = inkdrop.getActiveEditor()!;

  editor = new Editor(cm);
  disposable = inkdrop.onEditorUnload(() => editor!.dispose());
};

export const deactivate = () => {
  if (disposable) disposable.dispose();
  if (editor) editor.dispose();
};
