import CodeMirror from 'codemirror';

type Enclosure = {
  left: string;
  right: string;
};

export const ENCLOSURE_MAP: Record<string, Enclosure> = {
  'single-quotes': { left: "'", right: "'" },
  'double-quotes': { left: '"', right: '"' },
  backticks: { left: '`', right: '`' },
  parenthesis: { left: '(', right: ')' },
  'curly-brackets': { left: '{', right: '}' },
  'square-brackets': { left: '[', right: ']' },
  'angle-brackets': { left: '<', right: '>' },
};

type PositionType = 'anchor' | 'head';
const positionTypes: PositionType[] = ['anchor', 'head'];

export const encloseSelections = (cm: CodeMirror.Editor, leftEnclosure: string, rightEnclosure: string) => {
  const beforeReplacementSelections = cm.listSelections();
  const selectionStrings = cm.getSelections();
  const replacedSelections = selectionStrings.map(selectionString => leftEnclosure + selectionString + rightEnclosure);
  cm.replaceSelections(replacedSelections);

  const addedEnclosureCounter = {} as Record<number, number>;
  const insideEnclosureSelections = beforeReplacementSelections.map(selection => {
    const sortedPositionTypes = positionTypes.sort((a, b) => {
      return selection[a].line - selection[b].line || selection[a].ch - selection[b].ch;
    });
    return sortedPositionTypes.reduce((acc, positionType, i) => {
      const { line } = selection[positionType];
      addedEnclosureCounter[line] = (addedEnclosureCounter[line] || 0) + 1;

      const position = {
        line: selection[positionType].line,
        ch: selection[positionType].ch + addedEnclosureCounter[line],
      };
      if (i === 1) --position.ch;

      return { ...acc, [positionType]: position };
    }, {} as CodeMirror.Range);
  });
  cm.setSelections(insideEnclosureSelections);
};
