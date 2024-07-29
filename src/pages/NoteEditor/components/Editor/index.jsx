import { useState } from 'react';
import styled from 'styled-components';
import Title from './Title';
import Content from './Content';
import ToolBar from './ToolBar';

const EditorContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    border-radius: 0.5rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 6.5rem;
    padding-right: 6.5rem;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;

    @media (max-width: 48rem) {
        padding: 0.625rem;
    }
        position: relative;
`;

const Divider = styled.div`
    height: 0.0625rem;
    background: #B1B1B1;
    margin-top: 1rem;
    margin-bottom: 1rem;
    width: 100%;
    box-sizing: border-box;
`;

const ToolBarWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const Editor = () => {

    const [coverPanels, setCoverPanels] = useState([]);

    const addCoverPanel = () => {
        setCoverPanels(prevPanels => [
            ...prevPanels,
            { id: new Date().getTime() } // Unique ID based on timestamp
        ]);
    };


    
    return (
        <EditorContainer>
            <Title />
            <Divider />
            <Content coverPanels={coverPanels} />
            <ToolBarWrapper>
            <ToolBar onAddCoverPanel={addCoverPanel} />
            </ToolBarWrapper>
        </EditorContainer>
    );
};


export default Editor;
