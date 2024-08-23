import React from 'react';
import styled from 'styled-components';

const MoreOptionsContainer = styled.div`
    width: auto;
    display: flex;
    flex-direction: column;
    padding: 0.625rem 1.25rem;
    gap: 0.5rem;
    border: 1.25px solid #D9D9D9;
    background: #FFF;
    justify-content: space-between;
    position: absolute;
    z-index: 10;
    top: 2.5rem;
    right: 0;
    top: -20.5rem;
`;

const MoreOptionsItem = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0.125rem 0;
    border-radius: 0.125rem;
    cursor: pointer;
    padding: 0.2rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ECEFF4;
    };

    strong {
      align-self: flex-end; /* strong 태그에 align-self: flex-end 적용 */
    }
`;

const MoreOptions = React.forwardRef((props, ref) => {
    return (
        <MoreOptionsContainer ref={ref} onMouseDown={e => e.preventDefault()}>
            <MoreOptionsItem>
                <strong>H1</strong> # 제목 1
            </MoreOptionsItem>
            <MoreOptionsItem>
                <strong>H2</strong> ## 제목 2
            </MoreOptionsItem>
            <MoreOptionsItem>
                <strong>H3</strong> ### 제목 3
            </MoreOptionsItem>
            <MoreOptionsItem>
                <strong>B</strong> __굵게__
            </MoreOptionsItem>
            <MoreOptionsItem>
                <i>i</i> **기울임꼴**
            </MoreOptionsItem>
            <MoreOptionsItem>
                <u>U</u> ~~밑줄~~
            </MoreOptionsItem>
            <MoreOptionsItem>
                <s>S</s> ==취소선==
            </MoreOptionsItem>
        </MoreOptionsContainer>
    );
});

// displayName 추가
MoreOptions.displayName = 'MoreOptions';

export default MoreOptions;
