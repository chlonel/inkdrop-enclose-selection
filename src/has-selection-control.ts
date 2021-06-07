const HAS_SELECTIONS_CLASS = 'has-selections';

export const addHasSelectionsClass = (cm: CodeMirror.Editor) => {
  cm.getWrapperElement().classList.add(HAS_SELECTIONS_CLASS);
};

export const removeHasSelectionsClass = (cm: CodeMirror.Editor) => {
  cm.getWrapperElement().classList.remove(HAS_SELECTIONS_CLASS);
};

export const cursorActivityListener = (cm: CodeMirror.Editor) => {
  if (cm.somethingSelected()) {
    addHasSelectionsClass(cm);
  } else {
    removeHasSelectionsClass(cm);
  }
};
