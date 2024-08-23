import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import imageIcon from '../../../../assets/images.png';
import { getImageCard, uploadImageCard } from '../../../../api/editor/card/imagecard';
import { useSaveContext } from '../SaveContext';
import { addImageCard } from '../../../../api/noteeditor/imageCard/addImageCard';

const CardContainer = styled.div`
  width: 100%;
  height: 3.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 1.25rem;
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
  border-radius: 0.5rem;
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
  border-radius: 0.5rem;
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ imageWidth }) => `${imageWidth}px`}; /* 이미지 width로 설정 */

  border-radius: 0.5rem;
  border: 1px solid var(--grays-gray-5-divider, #E8E8E8);
`;

const ImageCardImage = styled.img`
  pointer-events: none; /* 이미지 수정 불가 */
  max-height: 100%;
  object-fit: contain;
`;

const Rectangle = styled.div`
  position: absolute;
  background-color: #6A9CFC;
  z-index: 10;
`;

const DeleteButton = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: inline-flex;
  padding: 0.5rem;
  align-items: center;

  border-radius: 0.25rem;
  border: 1px solid var(--grays-gray-5-divider, #E8E8E8);
  background: rgba(255, 255, 255, 0.5); /* 70% 투명 */
  color: var(--Main-Primary, #0F62FE);
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;

const ImageCard = (props) => {
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
 // const [rectangles, setRectangles] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [newRect, setNewRect] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isCreated, setIsCreated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scale, setScale] = useState({ x: 1, y: 1 });
  
  //const [imageWidth, setImageWidth] = useState(0); // 이미지 width 상태
  const [savedImageCard, setSavedImageCard] = useState(null); // Store the saved image card
  const [rectangles, setRectangles] = useState(props.overlays || []);
  const [imageWidth, setImageWidth] = useState(props.baseImageWidth || 0);
  const [imageHeight, setImageHeight] = useState(props.baseImageHeight || 0);
  //const { setSaveImageCard } = useSaveContext(); // Context에서 setSaveImageCard 함수 가져오기

  useEffect(() => {
    if (props.src) {
      const img = new Image();
      img.src = props.src;
      img.onload = () => {
        setImage(img);
        setImageWidth(props.baseImageWidth);
        setImageHeight(props.baseImageHeight);
        setRectangles(props.overlays || []);
      };
    }
  }, [props.src, props.baseImageWidth, props.baseImageHeight, props.overlays]);

  const handleCardClick = () => {
    fileInputRef.current.click();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsLoaded(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);

      //props.updateCard && props.updateCard({ imageFile: file });  // 부모 컴포넌트로 파일 전달

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          setImage(img);
          setImageWidth(img.width); // 이미지 width 설정
          setIsModalOpen(true);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const getCanvasCoordinates = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    // 이미지 렌더링 위치 계산
    const imageWidth = canvas.width;
    const imageHeight = canvas.height;
    const offsetX = (rect.width - imageWidth) / 2;  // 이미지 좌측 여백
    const offsetY = (rect.height - imageHeight) / 2; // 이미지 상단 여백

    // 마우스 클릭 위치에서 여백을 고려한 이미지 상의 좌표 계산
    const x = (event.clientX - rect.left - offsetX) * (image.width / imageWidth);
    const y = (event.clientY - rect.top - offsetY) * (image.height / imageHeight);
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

  const handleSubmit = async () => {
    if (!imageFile || rectangles.length === 0) return;

    const imageCard = {
      baseImageWidth: image.width, // 저장시의 원본 이미지 크기
      baseImageHeight: image.height,
      overlays: rectangles.map(rect => ({
        positionOfX: rect.x / scale.x,
        positionOfY: rect.y / scale.y,
        width: rect.width / scale.x,
        height: rect.height / scale.y,
      })),
    };
    console.log(imageCard);
    try {
      // addImageCard 호출
      const upload = await addImageCard(imageFile, imageCard);
      console.log('Upload successful:', upload);

    // prosemirror 노드의 attrs 업데이트
    if (props.updateCard) {
      props.updateCard({
        src: upload.imageUrl, // 업로드된 이미지 URL
        baseImageWidth: imageCard.baseImageWidth,
        baseImageHeight: imageCard.baseImageHeight,
        overlays: imageCard.overlays,
      });
    }

      setIsModalOpen(false); // 모달 닫기
      setIsCreated(true); // 이미지 카드 생성 완료 상태
    } catch (error) {
      alert('이미지 카드 저장에 실패했습니다.');
      console.error(error);
    }
};

    // 저장된 이미지 카드 불러오기
    const getImage = () => {
      if (!savedImageCard) {
        alert('No saved image card found.');
        return;
      }

      const { imageFile, imageCard } = savedImageCard;

      const img = new Image();
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
        img.onload = () => {
          setImage(img);
          setImageWidth(img.width); // Set image width
          const imageScale = {
            x: img.width / imageCard.baseImageWidth,
            y: img.height / imageCard.baseImageHeight,
          };
          setScale(imageScale);  // Store image scale
          setRectangles(imageCard.overlays.map(overlay => ({
            x: overlay.positionOfX * imageScale.x,
            y: overlay.positionOfY * imageScale.y,
            width: overlay.width * imageScale.x,
            height: overlay.height * imageScale.y,
          })));
          setIsCreated(true);
        };
      };
      reader.readAsDataURL(imageFile);
      setIsModalOpen(true);
    }

/*
  // 서버에서 이미지 카드 불러오기
  const getImage = async (cardId) => {
    try {
      const imageCard = await getImageCard(cardId);
      let img = new Image();
      img.src = imageCard.imgUrl;
      img.onload = () => {
          setImage(img);
          setImageWidth(img.width); // 이미지 width 설정
          const imageScale = {
              x: img.width / imageCard.baseImageWidth,
              y: img.height / imageCard.baseImageHeight,
          };
          setScale(imageScale);  // 이미지 스케일을 저장
          setRectangles(imageCard.overlays.map(overlay => ({
              x: overlay.positionOfX * imageScale.x,
              y: overlay.positionOfY * imageScale.y,
              width: overlay.width * imageScale.x,
              height: overlay.height * imageScale.y,
          })));
          setIsModalOpen(true);
          setIsLoaded(true);
      };
  } catch (error) {
      alert('이미지 카드 불러오기에 실패했습니다.');
  }
};
*/
  useEffect(() => {
    if (isModalOpen && canvasRef.current && image) {
        const canvas = canvasRef.current;
        const maxCanvasWidth = 1040; // 원하는 최대 너비
        const maxCanvasHeight = 720;  // 원하는 최대 높이
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

        // 이 부분에서 이미지의 스케일을 설정하고, 이 값을 나중에 사용해야 함
        //setScale({ x: canvasWidth / image.width, y: canvasHeight / image.height });
    // 원본 이미지 크기와 동일하게 설정
    setScale({ x: 1, y: 1 });

        canvas.width = image.width; // 캔버스 실제 크기
        canvas.height = image.height;
        canvas.style.width = `${canvasWidth}px`; // CSS 크기
        canvas.style.height = `${canvasHeight}px`;

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

const deleteNode = () => {
  const { view, getPos } = props;
  const pos = getPos(); // 현재 노드의 시작 위치를 가져옵니다.
  
  // 노드의 위치가 올바르게 계산되었는지 확인
  const resolvedPos = view.state.doc.resolve(pos);
  const nodeSize = resolvedPos.nodeAfter.nodeSize;

  const tr = view.state.tr.deleteRange(pos, pos + nodeSize);
  view.dispatch(tr);
};


  return (
    <>
      { /*<button onClick={() => getImage(12)}>이미지 카드 불러오기(test)</button>*/ }
      {isCreated && image ? (
      <ImageCardContainer imageWidth={imageWidth} imageHeight={imageHeight}>
          <ImageCardImage src={image.src} alt="Image" />
        <DeleteButton onClick={deleteNode}>X</DeleteButton>
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
