import { inputRules, wrappingInputRule, textblockTypeInputRule, InputRule } from 'prosemirror-inputrules';
import mySchema from './schema';

// Custom mark input rule function
function markInputRule(regexp, markType, leadingLength, trailingLength) {
  return new InputRule(regexp, (state, match, start, end) => {
    const { tr } = state;
    if (match && match[1] && markType) {
      const textStart = start + match[0].indexOf(match[1]);
      const textEnd = textStart + match[1].length;
      const text = match[1];

      // Ensure the original __, *, ~~, or ~ are removed
      tr.delete(end - trailingLength + 1, end); // Remove trailing syntax
      tr.delete(start, start + leadingLength); // Remove leading syntax

      // Adjust the start and end positions after deletion
      const adjustedTextStart = textStart - leadingLength;
      const adjustedTextEnd = textEnd - leadingLength;

      // Add the mark to the inner text
      tr.addMark(adjustedTextStart, adjustedTextEnd, markType.create());

      return tr;
    }
    return null;
  });
}

// Define input rules for markdown syntax
const headingRule = textblockTypeInputRule(
  /^#{1,6}\s$/,
  mySchema.nodes.heading,
  match => ({ level: match[0].length })
);

const bulletListRule = wrappingInputRule(
  /^\s*([-+*])\s$/,
  mySchema.nodes.bullet_list
);

const orderedListRule = wrappingInputRule(
  /^\s*(\d+)\.\s$/,
  mySchema.nodes.ordered_list
);

const codeBlockRule = textblockTypeInputRule(
  /^```$/,
  mySchema.nodes.code_block
);

const horizontalRuleInputRule = new InputRule(/^---$/, (state, match, start, end) => {
  const { tr } = state;
  if (match) {
    tr.replaceWith(start, end, mySchema.nodes.horizontal_rule.create());
  }
  return tr;
});

// Updated regex for bold, italic, strikethrough, underline, and code rules
const boldRule = markInputRule(/__(.+)__/g, mySchema.marks.strong, 2, 2);
const italicRule = markInputRule(/\*(.+)\*/g, mySchema.marks.em, 1, 1);
const strikethroughRule = markInputRule(/~~(.+)~~/g, mySchema.marks.strikethrough, 2, 2);
const underlineRule = markInputRule(/~(.+)~/g, mySchema.marks.underline, 1, 1);
const codeRule = markInputRule(/`(.+)`/g, mySchema.marks.code, 1, 1);

const myInputRules = (schema) => inputRules({
  rules: [
    headingRule,
    bulletListRule,
    orderedListRule,
    codeRule,
    codeBlockRule,
    boldRule,
    italicRule,
    strikethroughRule,
    underlineRule,
    horizontalRuleInputRule
  ]
});

export default myInputRules;
