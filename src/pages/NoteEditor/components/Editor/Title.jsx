import { useRef, useEffect } from 'react';
import styled from 'styled-components';

const TitleInput = styled.div`
    font-size: 1.5rem;
    border: none;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    &:focus {
        border: none;
        outline: none;
    }
    &.empty::before {
        content: attr(data-placeholder);
        color: #aaa;
    }
`;

const Title = () => {
    const titleRef = useRef(null);

    useEffect(() => {
        const node = titleRef.current;

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
        <TitleInput 
            contentEditable="true" 
            data-placeholder="제목을 입력하세요"
            ref={titleRef}
            className="empty"
        ></TitleInput>
    );
};

export default Title;
