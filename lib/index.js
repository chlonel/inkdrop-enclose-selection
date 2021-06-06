"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const positionTypeArray = ['anchor', 'head'];
const leftSurroundingChar = "'";
const rightSurroundingChar = "'";
let onLoadDisposable;
const activate = () => {
    onLoadDisposable = inkdrop.onEditorLoad(editor => {
        editor.cm.on('keydown', (cm, event) => {
            const { key } = event;
            if (key !== leftSurroundingChar)
                return;
            if (!cm.somethingSelected())
                return;
            event.preventDefault();
            const beforeReplacementSelections = cm.listSelections();
            const selectionStrings = cm.getSelections();
            const replacedSelections = selectionStrings.map(selectionString => leftSurroundingChar + selectionString + rightSurroundingChar);
            cm.replaceSelections(replacedSelections);
            const addedCharCounter = {};
            const insideSurroundingCharSelections = beforeReplacementSelections.map(selection => {
                const sortedPositionTypeArray = positionTypeArray.sort((a, b) => {
                    return selection[a].line - selection[b].line || selection[a].ch - selection[b].ch;
                });
                return sortedPositionTypeArray.reduce((acc, positionType, i) => {
                    const { line } = selection[positionType];
                    addedCharCounter[line] = (addedCharCounter[line] || 0) + 1;
                    const position = {
                        line: selection[positionType].line,
                        ch: selection[positionType].ch + addedCharCounter[line],
                    };
                    if (i === 1)
                        --position.ch;
                    return Object.assign(Object.assign({}, acc), { [positionType]: position });
                }, {});
            });
            cm.setSelections(insideSurroundingCharSelections);
        });
    });
};
exports.activate = activate;
const deactivate = () => {
    onLoadDisposable.dispose();
};
exports.deactivate = deactivate;
