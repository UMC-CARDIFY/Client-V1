import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import imageIcon from '../../../../assets/images.png';
import { getImageCard, uploadImageCard } from '../../../../api/editor/card/imagecard';

const CardContainer = styled.div`
  width: 100%;
  height: 3.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--Grays-Gray4, #CACACA);
  padding: 1rem 1.25rem;
  margin: 0.5rem 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  cursor: pointer;
`;

const ImageIcon = styled.img`
  width: 22px;
`;

const Text = styled.p`
  margin: 0;
  padding: 0;
  color: #B1B1B1;
`;

const Canvas = styled.canvas`
  display: block;
  max-width: 65rem;
  max-height: 40.5rem;
  width: 100%;
  height: auto;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8); /* 모달 전체 화면을 어둡게 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 65rem;
  max-height: 40.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none; /* 배경을 없앰 */
`;

const BackButton = styled.button`
  position: absolute;
  top: 0.75rem;
  left: 1rem;
  cursor: pointer;
  display: flex;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.6875rem 0.625rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  border-radius: 0.25rem;
  border: none;
  background: var(--Grays-Gray8, #F4F4F4);
`;

const CloseButton = styled.button`
  position: absolute;
  bottom: 0.75rem;
  right: 5rem;
  border: none;
  cursor: pointer;
  display: inline-flex;
  padding: 0.4375rem 0.875rem 0.375rem 0.875rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  background: var(--Grays-Gray8, #F4F4F4);
  color: var(--Grays-Gray2, #767676);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const SubmitButton = styled.button`
  position: absolute;
  bottom: 0.75rem;
  right: 1rem;
  border: none;
  cursor: pointer;
  display: inline-flex;
  padding: 0.4375rem 0.875rem 0.375rem 0.875rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  background: var(--Grays-Gray8, #F4F4F4);
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ImageCardContainer = styled.div`
  position: relative;
flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageCardImage = styled.img`
  pointer-events: none; /* 이미지 수정 불가 */
`;

const Rectangle = styled.div`
  position: absolute;
  background-color: #6A9CFC;
  z-index: 10;
`;

const ImageCard = () => {
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [rectangles, setRectangles] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [newRect, setNewRect] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isCreated, setIsCreated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // 이미지 불러오기 상태 추가

  const handleCardClick = () => {
    fileInputRef.current.click();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    //setRectangles([]);
    setIsLoaded(false); // 모달 닫을 때 상태 초기화
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          setImage(img);
          setIsModalOpen(true);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const getCanvasCoordinates = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    return { x, y };
  };

  const handleMouseDown = (event) => {
    if (!image) return;
    const { x, y } = getCanvasCoordinates(event);
    setIsDrawing(true);
    setIsDragging(false);
    setNewRect({ x, y, width: 0, height: 0 });
  };

  const handleMouseMove = (event) => {
    if (!isDrawing || !newRect) return;
    const { x, y } = getCanvasCoordinates(event);
    setNewRect((prevRect) => ({
      ...prevRect,
      width: x - prevRect.x,
      height: y - prevRect.y,
    }));
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    if (newRect) {
      setRectangles((prevRectangles) => [...prevRectangles, newRect]);
      setNewRect(null);
    }
    setIsDrawing(false);
    setTimeout(() => setIsDragging(false), 0);
  };

  const handleRectangleClick = (event) => {
    if (isDrawing || isDragging) return;
    const { x, y } = getCanvasCoordinates(event);
    setRectangles((prevRectangles) =>
      prevRectangles.filter(
        (rect) => !(x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height)
      )
    );
  };

  // 마지막으로 그린 사각형 삭제
  const handleUndo = () => {
    setRectangles((prevRectangles) => prevRectangles.slice(0, -1));
  };

  // 이미지 카드 저장하기
  const handleSubmit = async () => {
    if (!imageFile || rectangles.length === 0) return;

    const imageCard = {
      baseImageWidth: canvasRef.current.width,
      baseImageHeight: canvasRef.current.height,
      overlays: rectangles.map(rect => ({
        positionOfX: rect.x,
        positionOfY: rect.y,
        width: rect.width,
        height: rect.height,
      })),
    };

    try {
      const upload = await uploadImageCard(imageFile, imageCard);
      handleModalClose();
      setIsCreated(true);
      console.log(upload);
    }
    catch (error) {
      alert('이미지 카드 저장에 실패했습니다.');
    }
  };

  // 이미지 카드 불러오기
  const getImage = async (cardId) => {
    try {
      const imageCard = await getImageCard(cardId);
      console.log(imageCard);
      let img = new Image();
      img.src = imageCard.imgUrl;
      img.onload = () => {
        setImage(img);
        setRectangles(imageCard.overlays.map(overlay => ({
          x: overlay.positionOfX,
          y: overlay.positionOfY,
          width: overlay.width,
          height: overlay.height,
        })));
        setIsModalOpen(true);
        setIsLoaded(true); // 이미지를 불러올 때 상태 설정
      };
    }
    catch (error) {
      alert('이미지 카드 불러오기에 실패했습니다.');
    }
  }

  useEffect(() => {
    if (isModalOpen && canvasRef.current && image) {
      const canvas = canvasRef.current;
      const maxCanvasWidth = 1040; // 원하는 최대 너비
      const maxCanvasHeight = 720; // 원하는 최대 높이
      let canvasWidth = image.width;
      let canvasHeight = image.height;

      // 이미지 크기를 조절하여 캔버스 크기 설정
      if (canvasWidth > maxCanvasWidth || canvasHeight > maxCanvasHeight) {
        const scaleWidth = maxCanvasWidth / canvasWidth;
        const scaleHeight = maxCanvasHeight / canvasHeight;
        const scale = Math.min(scaleWidth, scaleHeight);
        canvasWidth = canvasWidth * scale;
        canvasHeight = canvasHeight * scale;
      }

      canvas.width = image.width; // 실제 해상도 유지
      canvas.height = image.height; // 실제 해상도 유지
      canvas.style.width = `${canvasWidth}px`; // CSS 크기 설정
      canvas.style.height = `${canvasHeight}px`; // CSS 크기 설정

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
  }, [isModalOpen, image]);

  useEffect(() => {
    if (canvasRef.current && image) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const drawCanvas = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        rectangles.forEach((rect) => {
          ctx.fillStyle = '#6A9CFC';
          ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        });
        if (newRect) {
          ctx.fillStyle = '#6A9CFC';
          ctx.fillRect(newRect.x, newRect.y, newRect.width, newRect.height);
        }
      };

      drawCanvas();
    }
  }, [rectangles, newRect]);

  return (
    <>
      <button onClick={() => getImage(12)}>이미지 카드 불러오기(test)</button>
      {isCreated && image ? (
        <ImageCardContainer>
          <ImageCardImage src={image.src} alt="Image" />
          {rectangles.map((rect, index) => (
            <Rectangle
              key={index}
              style={{
                left: `${rect.x}px`,
                top: `${rect.y}px`,
                width: `${rect.width}px`,
                height: `${rect.height}px`,
              }}
            />
          ))}
        </ImageCardContainer>
      ) : (
        <>
          <CardContainer onClick={handleCardClick}>
            <ImageIcon src={imageIcon} alt="Icon" />
            <Text>이미지 추가</Text>
          </CardContainer>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleFileChange}
          />
        </>
      )}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <Canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onClick={handleRectangleClick}
            />
            <BackButton onClick={handleUndo}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
              >
                <path
                  d="M0.821759 6.18334L0.410298 6.59218C0.183934 6.36662 0.183934 6.00006 0.410298 5.77451L0.821759 6.18334ZM20 15.4226C20 15.5757 19.9388 15.7226 19.8298 15.8309C19.7208 15.9392 19.573 16 19.4188 16C19.2647 16 19.1169 15.9392 19.0079 15.8309C18.8989 15.7226 18.8377 15.5757 18.8377 15.4226H20ZM6.63071 11.9605C6.4045 12.1852 6.03927 12.1852 5.81306 11.9605L0.410298 6.59218L1.23322 5.77451L6.63071 11.1376C6.85898 11.3644 6.85898 11.7337 6.63071 11.9605ZM0.410298 5.77451L5.81306 0.406219C6.03927 0.181451 6.4045 0.181451 6.63071 0.406218C6.85898 0.63303 6.85898 1.00231 6.63071 1.22912L1.23322 6.59218L0.410298 5.77451ZM0.821759 5.60589H12.4449V6.76079H0.821759V5.60589ZM20 13.1127V15.4226H18.8377V13.1127H20ZM12.4449 5.60589C14.4487 5.60589 16.3703 6.39679 17.7872 7.8046C19.204 9.21241 20 11.1218 20 13.1127H18.8377C18.8377 11.4281 18.1642 9.81246 16.9653 8.62124C15.7664 7.43001 14.1404 6.76079 12.4449 6.76079V5.60589Z"
                  fill="#1A1A1A"
                />
              </svg>
            </BackButton>
            <CloseButton onClick={handleModalClose}>취소</CloseButton>
            <SubmitButton onClick={handleSubmit}>저장</SubmitButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default ImageCard;
