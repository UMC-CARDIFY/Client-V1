import { useState } from 'react';
import styled from 'styled-components';
import ToolBar from './ToolBar';
import CombinedEditor from './CombinedEditor';

const EditorContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    border-radius: 0.5rem;
    padding-top: 2.5rem;
    padding-bottom: 6rem; // Leave space for the toolbar
    padding-left: 6.5rem;
    padding-right: 6.5rem;
    width: 100%;
    height: 85vh;
    box-sizing: border-box;

    @media (max-width: 48rem) {
        padding: 0.625rem;
    }
    position: relative;
`;

// const ToolBarContainer = styled.div`
//     position: fixed;
//     bottom: 0;
//     left: 50%;
//     transform: translateX(-50%);
//     width: 60%; // Adjust the width of the toolbar to match editor width
//     max-width: 800px;
//     border-top: 1px solid black;
//     background-color: white;

//     @media (max-width: 48rem) {
//         width: 90%;
//     }
// `;

const ToolBarWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const Editor = () => {
    const [cards, setCards] = useState([]);


    const addCard = (type) => {
      setCards([...cards, { type }]);
    };
    
    return (
        <EditorContainer>
            <CombinedEditor cards={cards}/>
            <ToolBarWrapper>
                <ToolBar  addCard={addCard} />
            </ToolBarWrapper>
        </EditorContainer>
    );
};


export default Editor;
