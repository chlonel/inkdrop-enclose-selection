import CodeMirror from 'codemirror';
import { Disposable } from 'event-kit';

type PositionType = 'anchor' | 'head';
const positionTypeArray: PositionType[] = ['anchor', 'head'];

const leftSurroundingChar = "'";
const rightSurroundingChar = "'";

let onLoadDisposable: Disposable;

export const activate = () => {
  onLoadDisposable = inkdrop.onEditorLoad(editor => {
    editor.cm.on('keydown', (cm, event) => {
      const { key } = event;
      if (key !== leftSurroundingChar) return;
      if (!cm.somethingSelected()) return;

      event.preventDefault();

      const beforeReplacementSelections = cm.listSelections();
      const selectionStrings = cm.getSelections();
      const replacedSelections = selectionStrings.map(
        selectionString => leftSurroundingChar + selectionString + rightSurroundingChar
      );
      cm.replaceSelections(replacedSelections);

      const addedSurroundingCharCounter = {} as Record<number, number>;
      const insideSurroundingCharSelections = beforeReplacementSelections.map(selection => {
        const sortedPositionTypeArray = positionTypeArray.sort((a, b) => {
          return selection[a].line - selection[b].line || selection[a].ch - selection[b].ch;
        });
        return sortedPositionTypeArray.reduce((acc, positionType, i) => {
          const { line } = selection[positionType];
          addedSurroundingCharCounter[line] = (addedSurroundingCharCounter[line] || 0) + 1;

          const position = {
            line: selection[positionType].line,
            ch: selection[positionType].ch + addedSurroundingCharCounter[line],
          };
          if (i === 1) --position.ch;

          return { ...acc, [positionType]: position };
        }, {} as CodeMirror.Range);
      });
      cm.setSelections(insideSurroundingCharSelections);
    });
  });
};

export const deactivate = () => {
  onLoadDisposable.dispose();
};
