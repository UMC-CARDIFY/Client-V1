import styled from 'styled-components';
import Title from './Title';
import Content from './Content';

const EditorContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    border-radius: 0.5rem;
    padding: 3rem;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;

    @media (max-width: 48rem) {
        padding: 0.625rem;
    }
`;

const Divider = styled.div`
    height: 0.0625rem;
    background: #B1B1B1;
    margin-top: 1rem;
    margin-bottom: 1rem;
    width: 100%;
    box-sizing: border-box;
`;

const Editor = () => {
    return (
        <EditorContainer>
            <Title />
            <Divider />
            <Content />
        </EditorContainer>
    );
};

export default Editor;
