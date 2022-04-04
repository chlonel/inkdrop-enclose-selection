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
const editor_1 = require("./editor");
let disposable = null;
let editor = null;
const waitEditorLoad = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!inkdrop.isEditorActive()) {
        yield new Promise((resolve) => inkdrop.onEditorLoad(resolve));
    }
});
const activate = () => __awaiter(void 0, void 0, void 0, function* () {
    yield waitEditorLoad();
    const { cm } = inkdrop.getActiveEditor();
    editor = new editor_1.Editor(cm);
    disposable = inkdrop.onEditorUnload(() => editor.dispose());
});
exports.activate = activate;
const deactivate = () => {
    if (disposable)
        disposable.dispose();
    if (editor)
        editor.dispose();
};
exports.deactivate = deactivate;
