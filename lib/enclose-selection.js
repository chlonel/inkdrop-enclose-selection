'use babel';

import EncloseSelectionMessageDialog from './enclose-selection-message-dialog';

module.exports = {

  activate() {
    inkdrop.components.registerClass(EncloseSelectionMessageDialog);
    inkdrop.layouts.addComponentToLayout(
      'modal',
      'EncloseSelectionMessageDialog'
    )
  },

  deactivate() {
    inkdrop.layouts.removeComponentFromLayout(
      'modal',
      'EncloseSelectionMessageDialog'
    )
    inkdrop.components.deleteClass(EncloseSelectionMessageDialog);
  }

};
