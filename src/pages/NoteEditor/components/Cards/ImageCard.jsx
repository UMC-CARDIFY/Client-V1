import styled from 'styled-components';
import imageIcon from '../../../../assets/images.png'

const CardContainer = styled.div`
  width: 100%;
  height: 3.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--Grays-Gray4, #CACACA);
  padding: 1rem 1.25rem;
  box-sizing: border-box;
  display:flex;
  flex-direction:row;
  gap: 16px;
  align-items:center;
`;
const ImageIcon = styled.img`
  width:22px;
  
`;

const Text = styled.p`
  margin: 0;
  padding: 0;
  color: #B1B1B1;
`;



const ImageCard = () => {
  return (
    <>
    <CardContainer>

      <ImageIcon src={imageIcon} alt="Icon" />
      <Text>이미지 추가</Text>
      
    </CardContainer>
    </>
  )
}

export default ImageCard