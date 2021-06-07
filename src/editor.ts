import CodeMirror from 'codemirror';
import { CompositeDisposable, Disposable } from 'event-kit';
import { encloseSelections } from './enclose-selection';
import { addHasSelectionsClass, removeHasSelectionsClass, cursorActivityListener } from './has-selection-control';

export class Editor extends Disposable {
  cm: CodeMirror.Editor;
  disposable: CompositeDisposable;

  constructor(cm: CodeMirror.Editor) {
    super(() => this.destroy());
    this.cm = cm;

    this.cm.on('cursorActivity', cursorActivityListener);
    if (cm.somethingSelected()) addHasSelectionsClass(this.cm);
    this.registerCommands();
  }

  registerCommands() {
    const wrapper = this.cm.getWrapperElement();
    const handlers = {
      'enclose-selection:quote': () => {
        encloseSelections(this.cm, "'", "'");
      },
    };
    this.disposable = inkdrop.commands.add(wrapper, handlers);
  }

  destroy() {
    this.disposable.dispose();
    this.cm.off('cursorActivity', cursorActivityListener);
    removeHasSelectionsClass(this.cm);
  }
}
