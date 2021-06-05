'use babel';

import SurroundSelectionMessageDialog from './surround-selection-message-dialog';

module.exports = {

  activate() {
    inkdrop.components.registerClass(SurroundSelectionMessageDialog);
    inkdrop.layouts.addComponentToLayout(
      'modal',
      'SurroundSelectionMessageDialog'
    )
  },

  deactivate() {
    inkdrop.layouts.removeComponentFromLayout(
      'modal',
      'SurroundSelectionMessageDialog'
    )
    inkdrop.components.deleteClass(SurroundSelectionMessageDialog);
  }

};
