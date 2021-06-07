"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cursorActivityListener = exports.removeHasSelectionsClass = exports.addHasSelectionsClass = void 0;
const HAS_SELECTIONS_CLASS = 'has-selections';
const addHasSelectionsClass = (cm) => {
    cm.getWrapperElement().classList.add(HAS_SELECTIONS_CLASS);
};
exports.addHasSelectionsClass = addHasSelectionsClass;
const removeHasSelectionsClass = (cm) => {
    cm.getWrapperElement().classList.remove(HAS_SELECTIONS_CLASS);
};
exports.removeHasSelectionsClass = removeHasSelectionsClass;
const cursorActivityListener = (cm) => {
    if (cm.somethingSelected()) {
        exports.addHasSelectionsClass(cm);
    }
    else {
        exports.removeHasSelectionsClass(cm);
    }
};
exports.cursorActivityListener = cursorActivityListener;
