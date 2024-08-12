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
    box-shadow: 0px 5px 6px 0px rgba(0, 0, 0, 0.05);
    position: absolute;
    z-index: 10;
    top: 2.5rem;
    right: 0;
    top: -31.5rem;
`;

const MoreOptionsItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
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
                <strong>---</strong> --- 구분선
            </MoreOptionsItem>
            <MoreOptionsItem>
                <strong>B</strong> __굵게__
            </MoreOptionsItem>
            <MoreOptionsItem>
                <i>i</i> *기울임꼴*
            </MoreOptionsItem>
            <MoreOptionsItem>
                <u>U</u> ~밑줄~
            </MoreOptionsItem>
            <MoreOptionsItem>
                <s>S</s> ~~취소선~~
            </MoreOptionsItem>
            <MoreOptionsItem>
                <a href="#">Link</a> [링크 이름](url)
            </MoreOptionsItem>
            <MoreOptionsItem>
                <span>&bull; 기호 리스트</span>
            </MoreOptionsItem>
            <MoreOptionsItem>
                <span>1. 숫자 리스트</span>
            </MoreOptionsItem>
            <MoreOptionsItem>
                <span>-[ ] 체크박스</span>
            </MoreOptionsItem>
            <MoreOptionsItem>
                <code>Code</code> `코드`
            </MoreOptionsItem>
            <MoreOptionsItem>
                <pre>Code block</pre> ```코드 블록```
            </MoreOptionsItem>
            <MoreOptionsItem>
                <mark>Mark</mark> ==Mark==
            </MoreOptionsItem>
        </MoreOptionsContainer>
    );
});

// displayName 추가
MoreOptions.displayName = 'MoreOptions';

export default MoreOptions;
