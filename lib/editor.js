"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Editor = void 0;
const event_kit_1 = require("event-kit");
const enclose_selection_1 = require("./enclose-selection");
const has_selection_control_1 = require("./has-selection-control");
const NAMESPACE = 'enclose-selection';
class Editor extends event_kit_1.Disposable {
    constructor(cm) {
        super(() => this.destroy());
        this.cm = cm;
        this.cm.on('cursorActivity', has_selection_control_1.cursorActivityListener);
        if (cm.somethingSelected())
            has_selection_control_1.addHasSelectionsClass(this.cm);
        this.registerCommands();
    }
    registerCommands() {
        const wrapper = this.cm.getWrapperElement();
        const handlers = Object.entries(enclose_selection_1.ENCLOSURE_MAP).reduce((acc, [name, { left, right }]) => {
            const commandName = `${NAMESPACE}:${name}`;
            return Object.assign(Object.assign({}, acc), { [commandName]: () => enclose_selection_1.encloseSelections(this.cm, left, right) });
        }, {});
        this.disposable = inkdrop.commands.add(wrapper, handlers);
    }
    destroy() {
        this.disposable.dispose();
        this.cm.off('cursorActivity', has_selection_control_1.cursorActivityListener);
        has_selection_control_1.removeHasSelectionsClass(this.cm);
    }
}
exports.Editor = Editor;
