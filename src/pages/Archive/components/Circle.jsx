import styled from 'styled-components';
import check from '../../../assets/check.svg'; // 체크 아이콘 경로

const Circle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${props => props.bgColor || 'gray'};
  position: relative;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${props => props.isFilter ? '12px' : '8px'}; /* 체크 아이콘 크기 또는 원형 크기 조절 */
    height: ${props => props.isFilter ? '12px' : '8px'}; /* 체크 아이콘 크기 또는 원형 크기 조절 */
    background-color: ${props => props.isFilter ? 'transparent' : (props.isSelected ? 'white' : 'transparent')}; /* 필터가 아닐 때 흰색 원형 */
    background-image: ${props => props.isFilter && props.isSelected ? `url(${check})` : 'none'}; /* 필터 모드에서 체크 아이콘 */
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

`;

export default Circle;
