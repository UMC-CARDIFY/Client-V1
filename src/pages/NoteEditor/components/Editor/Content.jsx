import { useRef, useEffect } from 'react';
import styled from 'styled-components';

const ContentArea = styled.div`
    flex: 1;
    border: none;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    resize: none;
    height: calc(100vh - 8.5rem); /* 제목 입력 필드, 디바이더와 패딩을 고려한 높이 */
    overflow-y: auto;
    &:focus {
        border: none;
        outline: none;
    }
    &.empty::before {
        content: attr(data-placeholder);
        color: #aaa;
    }

    @media (max-width: 48rem) {
        height: calc(100vh - 6rem);
    }
`;

const Content = () => {
    const contentRef = useRef(null);

    useEffect(() => {
        const node = contentRef.current;

        const handleInput = () => {
            if (node.innerText === '') {
                node.classList.add('empty');
            } else {
                node.classList.remove('empty');
            }
        };

        node.addEventListener('input', handleInput);
        handleInput(); // 초기 상태 설정

        return () => {
            node.removeEventListener('input', handleInput);
        };
    }, []);

    return (
        <ContentArea 
            contentEditable="true" 
            data-placeholder="내용을 입력하세요"
            ref={contentRef}
            className="empty"
        ></ContentArea>
    );
};

export default Content;
