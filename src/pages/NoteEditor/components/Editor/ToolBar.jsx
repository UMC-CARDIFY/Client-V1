import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import MoreOptions from './MoreOptions'; // MoreOptions 컴포넌트 임포트

const ToolBarContainer = styled.div`
    width: auto;
    display: inline-flex;
    padding: 0.625rem 1.25rem;
    justify-content: center;
    align-items: center;
    gap: 0.9375rem;
    border: 1.25px solid #D9D9D9;
    background: #FFF;
    box-shadow: 0px 5px 6px 0px rgba(0, 0, 0, 0.05);
    position: absolute;
    bottom: 9.5rem;
    left: 25%;
`;

const ToolBarItem = styled.div`
    width: var(--line-height-xl, 2.5rem);
    height: var(--line-height-xl, 2.5rem);
    background: #D9D9D9;
    cursor: pointer;
`;

const ToolBar = () => {
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const moreOptionsRef = useRef(null);

    const createWordCard = () => {
        console.log('createWordCard');
    }

    const boldText = () => {
        console.log('boldText');
    }

    const toggleMoreOptions = () => {
        setShowMoreOptions(!showMoreOptions);
    }

    const handleClickOutside = (event) => {
        if (moreOptionsRef.current && !moreOptionsRef.current.contains(event.target)) {
            setShowMoreOptions(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <ToolBarContainer>
                <ToolBarItem onClick={createWordCard}>단어</ToolBarItem>
                <ToolBarItem>빈칸</ToolBarItem>
                <ToolBarItem>멀티</ToolBarItem>
                <ToolBarItem>가림판</ToolBarItem>
                <ToolBarItem>제목 1</ToolBarItem>
                <ToolBarItem onClick={boldText}>굵게</ToolBarItem>
                <ToolBarItem>글씨 색</ToolBarItem>
                <ToolBarItem>형광펜 색</ToolBarItem>
                <ToolBarItem onClick={toggleMoreOptions}>더보기</ToolBarItem>
            </ToolBarContainer>
            {showMoreOptions && <MoreOptions ref={moreOptionsRef} />}
        </>
    );
}

export default ToolBar;
