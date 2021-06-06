"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const positionTypeArray = ['anchor', 'head'];
const leftEnclosure = "'";
const rightEnclosure = "'";
const keydownCallback = (cm, event) => {
    const { key } = event;
    if (key !== leftEnclosure)
        return;
    if (!cm.somethingSelected())
        return;
    event.preventDefault();
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
const activate = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!inkdrop.isEditorActive()) {
        yield new Promise(resolve => inkdrop.onEditorLoad(resolve));
    }
    const editor = inkdrop.getActiveEditor();
    editor.cm.on('keydown', keydownCallback);
});
exports.activate = activate;
const deactivate = () => {
    const editor = inkdrop.getActiveEditor();
    editor.cm.off('keydown', keydownCallback);
};
exports.deactivate = deactivate;
