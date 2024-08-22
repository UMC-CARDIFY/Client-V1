import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Node as ProseMirrorNode } from 'prosemirror-model';
import mySchema from '../../NoteEditor/components/Editor/setup/schema';
import PropTypes from 'prop-types';
import WordCardView from '../../NoteEditor/components/Editor/setup/wordcardView';
import BlankCardView from '../../NoteEditor/components/Editor/setup/blankcardView';
import MultiCardView from '../../NoteEditor/components/Editor/setup/multicardView';
import ImageCardView from '../../NoteEditor/components/Editor/setup/imagecardView';

const DisabledEditorWrapper = styled.div`
  .prosemirror-editor-view {
    pointer-events: none;
  }
`;

const NotePreview = ({ content }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current || !content) return;
    // JSON 데이터를 ProseMirror Node로 변환
    console.log(content);

    let parsedContent;
    try {
      // JSON 문자열을 파싱하여 객체로 변환
      parsedContent = JSON.parse(content);
    } catch (error) {
      console.error("Failed to parse content JSON:", error);
      return;
    }

    let doc;
    try {
      doc = ProseMirrorNode.fromJSON(mySchema, parsedContent);
    } catch (error) {
      console.error("Error parsing ProseMirror node:", error);
      return;
    }

    // ProseMirror 문서 상태 설정
    const state = EditorState.create({
      doc,
      schema: mySchema
    });

    // ProseMirror 뷰 설정 (뷰어 모드로)
    const view = new EditorView(editorRef.current, {
        state,
        editable: () => false, // 편집 불가능하게 설정
        attributes: {
          class: 'prosemirror-editor-view'
        },
        nodeViews: {
          word_card(node, view, getPos) {
            return new WordCardView(node, view, getPos);
          },
          blank_card(node, view, getPos) {
            return new BlankCardView(node, view, getPos);
          },
          multi_card(node, view, getPos) {
            return new MultiCardView(node, view, getPos);
          },
          image_card(node, view, getPos) {
            return new ImageCardView(node, view, getPos);
          }
        }
      });

    return () => {
      view.destroy();
    };
  }, [content]);

  if (!content) {
    return null; // content가 없으면 아무것도 렌더링하지 않음
  }

  return (
    <DisabledEditorWrapper>
    <div ref={editorRef} />
    </DisabledEditorWrapper>
  );
};

NotePreview.propTypes = {
    content: PropTypes.string.isRequired,
}

export default NotePreview;