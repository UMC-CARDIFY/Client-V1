import { inputRules, wrappingInputRule, textblockTypeInputRule, InputRule } from 'prosemirror-inputrules';
import mySchema from './schema';

function markInputRule(regexp, markType, leadingLength, trailingLength) {
  return new InputRule(regexp, (state, match, start, end) => {
    const { tr } = state;
    if (match && match[1] && markType) {
      const textStart = start + match[0].indexOf(match[1]);
      const textEnd = textStart + match[1].length;

      tr.delete(end - trailingLength, end); // Remove trailing syntax
      tr.delete(start, start + leadingLength); // Remove leading syntax

      const adjustedTextStart = textStart - leadingLength;
      const adjustedTextEnd = textEnd - leadingLength;

      tr.addMark(adjustedTextStart, adjustedTextEnd, markType.create());
      return tr;
    }
    return null;
  });
}

// 헤딩 규칙
const headingRule = textblockTypeInputRule(/^#{1,6}\s$/, mySchema.nodes.heading, match => ({ level: match[0].length }));

// 불렛 리스트 규칙: 'list_item'으로 수정
const bulletListRule = wrappingInputRule(/^\s*([-+*])\s$/, mySchema.nodes.bullet_list);

// 번호 리스트 규칙
const orderedListRule = wrappingInputRule(/^\s*(\d+)\.\s$/, mySchema.nodes.ordered_list);

// 코드 블록 규칙
const codeBlockRule = new InputRule(/^```$/, (state, match, start, end) => {
  const { tr } = state;
  if (match) {
    tr.replaceWith(start, end, mySchema.nodes.code_block.create());
  }
  return tr;
});

// 수평선 규칙
const horizontalRuleInputRule = new InputRule(/^---$/, (state, match, start, end) => {
  const { tr } = state;
  if (match) {
    tr.replaceWith(start, end, mySchema.nodes.horizontal_rule.create());
  }
  return tr;
});

// 마크다운 스타일 규칙
const boldRule = markInputRule(/__(.+)__/g, mySchema.marks.strong, 2, 2);
const italicRule = markInputRule(/\*(.+)\*/g, mySchema.marks.em, 1, 1);
const strikethroughRule = markInputRule(/~~(.+)~~/g, mySchema.marks.strikethrough, 2, 2);
const underlineRule = markInputRule(/~(.+)~/g, mySchema.marks.underline, 1, 1);
const codeRule = markInputRule(/`([^`]+)`/, mySchema.marks.code, 1, 1);

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
    horizontalRuleInputRule,
  ]
});

export { myInputRules };
