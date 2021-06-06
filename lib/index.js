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
exports.activate = void 0;
const positionTypeArray = ['anchor', 'head'];
const leftSurroundingChar = "'";
const rightSurroundingChar = "'";
const activate = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!inkdrop.isEditorActive()) {
        yield new Promise(resolve => inkdrop.onEditorLoad(resolve));
    }
    const editor = inkdrop.getActiveEditor();
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
        const addedSurroundingCharCounter = {};
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
                if (i === 1)
                    --position.ch;
                return Object.assign(Object.assign({}, acc), { [positionType]: position });
            }, {});
        });
        cm.setSelections(insideSurroundingCharSelections);
    });
});
exports.activate = activate;
