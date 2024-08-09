import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import imageIcon from '../../../../assets/images.png';
import axios from 'axios';
import config from '../../../../api/config';

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
  border: 1px solid #CACACA;
  display: block;
  width: 100%; /* CSS 크기 */
  height: auto; /* CSS 크기 */
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  width: 65rem;
  min-width: 40rem;
  padding: 2rem;
  z-index: 1001;
  position: relative;
`;

const CloseButton = styled.button`
  margin-top: 1rem;
`;

const SubmitButton = styled.button`
  margin-top: 1rem;
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

  const handleCardClick = () => {
    fileInputRef.current.click();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setImage(null);
    setRectangles([]);
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

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('imageCard', JSON.stringify(imageCard));

    console.log('FormData to be sent:');
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      const response = await axios.post(`${config.apiBaseUrl}/cards/add/Image`, formData, {
        headers: {
          Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyNjIwNjIwN30.1',
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Success:', response.data);
      handleModalClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (isModalOpen && canvasRef.current && image) {
      const canvas = canvasRef.current;
      const maxCanvasWidth = 950; // 원하는 최대 너비
      const maxCanvasHeight = 700; // 원하는 최대 높이
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
          ctx.fillStyle = '#1062FE';
          ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        });
        if (newRect) {
          ctx.fillStyle = '#1062FE';
          ctx.fillRect(newRect.x, newRect.y, newRect.width, newRect.height);
        }
      };

      drawCanvas();
    }
  }, [rectangles, newRect]);

  return (
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
            <CloseButton onClick={handleModalClose}>닫기</CloseButton>
            <SubmitButton onClick={handleSubmit}>저장</SubmitButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default ImageCard;
