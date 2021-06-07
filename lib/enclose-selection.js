"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encloseSelections = void 0;
const positionTypeArray = ['anchor', 'head'];
const encloseSelections = (cm, leftEnclosure, rightEnclosure) => {
    const beforeReplacementSelections = cm.listSelections();
    const selectionStrings = cm.getSelections();
    const replacedSelections = selectionStrings.map(selectionString => leftEnclosure + selectionString + rightEnclosure);
    cm.replaceSelections(replacedSelections);
    const addedEnclosureCounter = {};
    const insideEnclosureSelections = beforeReplacementSelections.map(selection => {
        const sortedPositionTypeArray = positionTypeArray.sort((a, b) => {
            return selection[a].line - selection[b].line || selection[a].ch - selection[b].ch;
        });
        return sortedPositionTypeArray.reduce((acc, positionType, i) => {
            const { line } = selection[positionType];
            addedEnclosureCounter[line] = (addedEnclosureCounter[line] || 0) + 1;
            const position = {
                line: selection[positionType].line,
                ch: selection[positionType].ch + addedEnclosureCounter[line],
            };
            if (i === 1)
                --position.ch;
            return Object.assign(Object.assign({}, acc), { [positionType]: position });
        }, {});
    });
    cm.setSelections(insideEnclosureSelections);
};
exports.encloseSelections = encloseSelections;
