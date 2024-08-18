import { useState } from 'react';
import PropTypes from 'prop-types';
import CardIcon from './CardIcon';
import DeleteModal from './DeleteModal';
import styled from 'styled-components';

const CardContainer = styled.div`
  position: relative;
  width: 29rem;
  height: 17.25rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.02), 0px 10px 60px 0px rgba(0, 74, 162, 0.03);
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1.5rem 2.5rem 2.5rem;
  box-sizing: border-box;
`;

const CardHeader = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
`;  

const CardIconDiv = styled.div`
  align-self: center;
  margin-bottom: 0.5rem;
`;

const CardTitle = styled.div`
  color: var(--Grays-Black, #1A1A1A);
  text-align: center;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const CardSubtitle = styled.div`
  color: var(--Grays-Black, #1A1A1A);
  text-align: center;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-weight: 400;
`;

const DayDiv = styled.div`
border: 1px solid red;
  display: inline-flex;
  align-items: center;
  gap: 3rem;
`;

const Day = styled.div`
  display: flex;
  width: 5rem;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
`;

const Date = styled.div`
  color: var(--Grays-Black, #1A1A1A);
  text-align: center;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-weight: 500;
`;

const DateText = styled.div`
  color: var(--Grays-Gray2, #767676);
  text-align: center;
  font-family: Pretendard;
  font-size: 0.6875rem;
  font-weight: 500;
`;

const CardFooter = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const Button = styled.button`
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  background: var(--Main-BackGround, #F2F4F8);
  color: var(--Grays-Black, #1A1A1A);
  font-family: Pretendard;
  font-size: 0.75rem;
  font-weight: 500;
`;

const Line = styled.div`
  width: 23rem;
  height: 0.0625rem;
  background: #E8E8E8;
  align-self: center;
`;

const MoreOptions = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  cursor: pointer;
  position: absolute;
  top: 2.25rem;
  right: 1.5rem;
`;

const StatusBadge = styled.div`
  position: absolute;
  top: 2rem;
  left: 2.5rem;
  display: inline-flex;
  padding: 0.375rem 1rem;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  background: ${({ status }) => (status === '학습 중' ? '#E7EFFF' : status === '학습 전' ? '#EDEDED' : 'var(--Grays-Gray6, #EDEDED)')};
  color: ${({ status }) => (status === '학습 중' ? '#0F62FE' : '#1A1A1A')};
  font-family: Pretendard;
  font-size: 0.75rem;
  font-weight: 500;
`;

const DeleteButton = styled.div`
  position: absolute;
  top: 2.38rem;
  right: 2.81rem;
  display: ${({ show }) => (show ? 'block' : 'none')};
  width: 9.1rem;
  height: 3.125rem;
  box-sizing: border-box;
  padding: 1.03125rem 4rem 1.03125rem 1.125rem;
  border: 1px solid #dedede;
  background: #fff;
  cursor: pointer;
  z-index: 10;
  color: #000;
  font-family: Inter;
  font-size: 0.875rem;
  font-weight: 500;
`;

const FlashcardItem = ({ note, folder, recentDate, nextDate, status, color }) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleDeleteButton = () => {
    setShowDeleteButton((prev) => !prev);
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    console.log('카드가 삭제되었습니다.');
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <CardContainer>
      <CardHeader>
        <CardIconDiv>
          <CardIcon color={color} />
        </CardIconDiv>
        <CardTitle>{note}</CardTitle>
        <CardSubtitle>{folder}</CardSubtitle>
      </CardHeader>
      <Line />
      <DayDiv>
        <Day>
          <Date>{recentDate}</Date>
          <DateText>최근 학습일</DateText>
        </Day>
        <Day>
          <Date>{nextDate}</Date>
          <DateText>다음 학습일</DateText>
        </Day>
      </DayDiv>
      <CardFooter>
      <Button>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10.7617 2.08089L10.7617 2.08088C11.1027 1.73983 11.5606 1.54122 12.0426 1.52535C12.5241 1.50949 12.9936 1.67714 13.3561 1.99432L13.4496 2.08202L13.9198 2.55214C13.9198 2.55214 13.9198 2.55215 13.9198 2.55215C14.2606 2.89309 14.4591 3.35088 14.475 3.83274C14.4909 4.31404 14.3233 4.78338 14.0063 5.14585L13.9186 5.2394L6.44632 12.7124C6.44632 12.7124 6.44632 12.7124 6.44632 12.7124C6.35187 12.8068 6.23759 12.8791 6.11177 12.9238L6.00926 12.9536L3.0431 13.6382L3.04294 13.6382C2.95452 13.6588 2.86246 13.6578 2.7745 13.6353C2.68654 13.6129 2.60527 13.5696 2.53752 13.5092C2.46977 13.4488 2.41753 13.373 2.3852 13.2882C2.35321 13.2042 2.34164 13.1139 2.35141 13.0247L2.36374 12.955L3.04769 9.98817C3.04769 9.98815 3.0477 9.98812 3.0477 9.9881C3.07796 9.85785 3.13685 9.736 3.2201 9.63139L3.29037 9.55225L10.7617 2.08089ZM10.2905 4.29574L10.2197 4.22506L10.1491 4.29575L4.15669 10.2881L4.13641 10.3084L4.12996 10.3364L3.70603 12.1747L3.67008 12.3306L3.82598 12.2946L5.66434 11.87L5.69228 11.8636L5.71255 11.8433L11.7049 5.85094L11.7756 5.78022L11.7049 5.70951L10.2905 4.29574ZM11.6356 2.81836L11.6354 2.8182L11.6307 2.82241L11.568 2.87773L11.5679 2.87759L11.5635 2.88193L11.0916 3.35319L11.0208 3.42392L11.0916 3.49468L12.506 4.90845L12.5767 4.97913L12.6474 4.90843L13.1187 4.43718L13.048 4.36646L13.1187 4.43717C13.2507 4.30518 13.33 4.12956 13.3417 3.94326C13.3534 3.75697 13.2967 3.5728 13.1823 3.42532L13.1825 3.42519L13.1783 3.42042L13.1229 3.35776L13.1231 3.35764L13.1187 3.35324L12.6474 2.88198L12.5767 2.95269L12.6474 2.88198C12.5154 2.75 12.3398 2.67071 12.1535 2.659C11.9672 2.64728 11.7831 2.70395 11.6356 2.81836Z" fill="#1A1A1A" stroke="#F2F4F8" strokeWidth="0.2"/>
        </svg>
      일반학습</Button>
        <Button>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <g clipPath="url(#clip0_1372_7665)">
          <path d="M10.5 5C11.0052 5 11.4922 5.0651 11.9609 5.19531C12.4297 5.32552 12.8672 5.51042 13.2734 5.75C13.6797 5.98958 14.0521 6.27604 14.3906 6.60938C14.7292 6.94271 15.0156 7.3125 15.25 7.71875C15.4844 8.125 15.6693 8.5651 15.8047 9.03906C15.9401 9.51302 16.0052 10 16 10.5C16 11.0052 15.9349 11.4922 15.8047 11.9609C15.6745 12.4297 15.4896 12.8672 15.25 13.2734C15.0104 13.6797 14.724 14.0521 14.3906 14.3906C14.0573 14.7292 13.6875 15.0156 13.2812 15.25C12.875 15.4844 12.4349 15.6693 11.9609 15.8047C11.487 15.9401 11 16.0052 10.5 16C9.99479 16 9.50781 15.9349 9.03906 15.8047C8.57031 15.6745 8.13281 15.4896 7.72656 15.25C7.32031 15.0104 6.94792 14.724 6.60938 14.3906C6.27083 14.0573 5.98438 13.6875 5.75 13.2812C5.51562 12.875 5.33073 12.4349 5.19531 11.9609C5.0599 11.487 4.99479 11 5 10.5C5 10.3333 5.00781 10.1667 5.02344 10C4.33073 10 3.67969 9.86979 3.07031 9.60938C2.46094 9.34896 1.92969 8.99479 1.47656 8.54688C1.02344 8.09896 0.664062 7.57031 0.398438 6.96094C0.132812 6.35156 0 5.69792 0 5C0 4.54167 0.0598958 4.09896 0.179688 3.67188C0.299479 3.24479 0.466146 2.84635 0.679688 2.47656C0.893229 2.10677 1.15365 1.77083 1.46094 1.46875C1.76823 1.16667 2.10677 0.90625 2.47656 0.6875C2.84635 0.46875 3.24479 0.299479 3.67188 0.179688C4.09896 0.0598958 4.54167 0 5 0C5.46354 0 5.90885 0.0598958 6.33594 0.179688C6.76302 0.299479 7.16146 0.46875 7.53125 0.6875C7.90104 0.90625 8.23698 1.16667 8.53906 1.46875C8.84115 1.77083 9.10156 2.10938 9.32031 2.48438C9.53906 2.85938 9.70573 3.26042 9.82031 3.6875C9.9349 4.11458 9.99479 4.5599 10 5.02344C10.1615 5.00781 10.3281 5 10.5 5ZM5 9C5.03646 9 5.07292 8.9974 5.10938 8.99219C5.14583 8.98698 5.18229 8.98177 5.21875 8.97656C5.3125 8.64844 5.4349 8.33594 5.58594 8.03906C5.73698 7.74219 5.91667 7.45573 6.125 7.17969C5.94271 7.1224 5.75781 7.07812 5.57031 7.04688C5.38281 7.01562 5.19271 7 5 7C4.68229 7 4.3724 7.03906 4.07031 7.11719C3.76823 7.19531 3.47396 7.30729 3.1875 7.45312L2.73438 6.5625C3.08854 6.38542 3.45573 6.2474 3.83594 6.14844C4.21615 6.04948 4.60417 6 5 6C5.32292 6 5.63802 6.03385 5.94531 6.10156C6.2526 6.16927 6.55729 6.26302 6.85938 6.38281C7.16667 6.11198 7.4974 5.8776 7.85156 5.67969C8.20573 5.48177 8.58073 5.32812 8.97656 5.21875L8.99219 5.10938C8.9974 5.07292 9 5.03646 9 5C9 4.44792 8.89583 3.92969 8.6875 3.44531C8.47917 2.96094 8.19271 2.53906 7.82812 2.17969C7.46354 1.82031 7.03906 1.53385 6.55469 1.32031C6.07031 1.10677 5.55208 1 5 1C4.44792 1 3.92969 1.10417 3.44531 1.3125C2.96094 1.52083 2.53906 1.80729 2.17969 2.17188C1.82031 2.53646 1.53385 2.96094 1.32031 3.44531C1.10677 3.92969 1 4.44792 1 5C1 5.55208 1.10417 6.07031 1.3125 6.55469C1.52083 7.03906 1.80729 7.46094 2.17188 7.82031C2.53646 8.17969 2.96094 8.46615 3.44531 8.67969C3.92969 8.89323 4.44792 9 5 9ZM10.5 15C11.1198 15 11.7031 14.8828 12.25 14.6484C12.7969 14.4141 13.2734 14.0911 13.6797 13.6797C14.0859 13.2682 14.4062 12.7917 14.6406 12.25C14.875 11.7083 14.9948 11.125 15 10.5C15 9.88021 14.8828 9.29688 14.6484 8.75C14.4141 8.20312 14.0911 7.72656 13.6797 7.32031C13.2682 6.91406 12.7917 6.59375 12.25 6.35938C11.7083 6.125 11.125 6.00521 10.5 6C9.88021 6 9.29688 6.11719 8.75 6.35156C8.20312 6.58594 7.72656 6.90885 7.32031 7.32031C6.91406 7.73177 6.59375 8.20833 6.35938 8.75C6.125 9.29167 6.00521 9.875 6 10.5C6 11.1198 6.11719 11.7031 6.35156 12.25C6.58594 12.7969 6.90885 13.2734 7.32031 13.6797C7.73177 14.0859 8.20833 14.4062 8.75 14.6406C9.29167 14.875 9.875 14.9948 10.5 15ZM12.5 10.25C12.2917 10.25 12.1146 10.1771 11.9688 10.0312C11.8229 9.88542 11.75 9.70833 11.75 9.5C11.75 9.29167 11.8229 9.11458 11.9688 8.96875C12.1146 8.82292 12.2917 8.75 12.5 8.75C12.7083 8.75 12.8854 8.82292 13.0312 8.96875C13.1771 9.11458 13.25 9.29167 13.25 9.5C13.25 9.70833 13.1771 9.88542 13.0312 10.0312C12.8854 10.1771 12.7083 10.25 12.5 10.25ZM8.5 10.25C8.29167 10.25 8.11458 10.1771 7.96875 10.0312C7.82292 9.88542 7.75 9.70833 7.75 9.5C7.75 9.29167 7.82292 9.11458 7.96875 8.96875C8.11458 8.82292 8.29167 8.75 8.5 8.75C8.70833 8.75 8.88542 8.82292 9.03125 8.96875C9.17708 9.11458 9.25 9.29167 9.25 9.5C9.25 9.70833 9.17708 9.88542 9.03125 10.0312C8.88542 10.1771 8.70833 10.25 8.5 10.25ZM10.5 13C10.724 13 10.9427 12.9714 11.1562 12.9141C11.3698 12.8568 11.5703 12.7708 11.7578 12.6562C11.9453 12.5417 12.1172 12.4062 12.2734 12.25C12.4297 12.0938 12.5625 11.9167 12.6719 11.7188L13.5391 12.2109C13.3828 12.487 13.1953 12.7344 12.9766 12.9531C12.7578 13.1719 12.5182 13.3594 12.2578 13.5156C11.9974 13.6719 11.7188 13.7917 11.4219 13.875C11.125 13.9583 10.8177 14 10.5 14C10.1823 14 9.875 13.9583 9.57812 13.875C9.28125 13.7917 9.0026 13.6745 8.74219 13.5234C8.48177 13.3724 8.24219 13.1849 8.02344 12.9609C7.80469 12.737 7.61719 12.487 7.46094 12.2109L8.32812 11.7188C8.4375 11.9167 8.57031 12.0938 8.72656 12.25C8.88281 12.4062 9.05469 12.5391 9.24219 12.6484C9.42969 12.7578 9.6276 12.8438 9.83594 12.9062C10.0443 12.9688 10.2656 13 10.5 13ZM3.5 4.125C3.32812 4.125 3.18229 4.0651 3.0625 3.94531C2.94271 3.82552 2.88021 3.67708 2.875 3.5C2.875 3.32812 2.9349 3.18229 3.05469 3.0625C3.17448 2.94271 3.32292 2.88021 3.5 2.875C3.67188 2.875 3.81771 2.9349 3.9375 3.05469C4.05729 3.17448 4.11979 3.32292 4.125 3.5C4.125 3.67188 4.0651 3.81771 3.94531 3.9375C3.82552 4.05729 3.67708 4.11979 3.5 4.125ZM6.5 4.125C6.32812 4.125 6.18229 4.0651 6.0625 3.94531C5.94271 3.82552 5.88021 3.67708 5.875 3.5C5.875 3.32812 5.9349 3.18229 6.05469 3.0625C6.17448 2.94271 6.32292 2.88021 6.5 2.875C6.67188 2.875 6.81771 2.9349 6.9375 3.05469C7.05729 3.17448 7.11979 3.32292 7.125 3.5C7.125 3.67188 7.0651 3.81771 6.94531 3.9375C6.82552 4.05729 6.67708 4.11979 6.5 4.125Z" fill="#1A1A1A"/>
          </g>
          <defs>
        <clipPath clipPath id="clip0_1372_7665">
        <rect width="16" height="16" fill="white"/>
        </clipPath>
        </defs>
      </svg>분석학습</Button>
      <Button>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M1.66602 1.8335C1.66602 1.70089 1.61334 1.57371 1.51957 1.47994C1.4258 1.38617 1.29862 1.3335 1.16602 1.3335C1.03341 1.3335 0.90623 1.38617 0.812462 1.47994C0.718694 1.57371 0.666016 1.70089 0.666016 1.8335V14.1668C0.666016 14.4428 0.890016 14.6668 1.16602 14.6668H13.3327C13.4653 14.6668 13.5925 14.6142 13.6862 14.5204C13.78 14.4266 13.8327 14.2994 13.8327 14.1668C13.8327 14.0342 13.78 13.907 13.6862 13.8133C13.5925 13.7195 13.4653 13.6668 13.3327 13.6668H1.66602V1.8335Z" fill="#1A1A1A"/>
          <path d="M14.8541 5.18656C14.9424 5.09178 14.9905 4.96642 14.9882 4.83688C14.9859 4.70735 14.9334 4.58376 14.8418 4.49215C14.7502 4.40054 14.6266 4.34807 14.4971 4.34578C14.3676 4.3435 14.2422 4.39158 14.1474 4.4799L10.3341 8.29323L7.85409 5.81323C7.76034 5.7196 7.63325 5.667 7.50075 5.667C7.36825 5.667 7.24117 5.7196 7.14742 5.81323L3.14742 9.81323C3.0983 9.85901 3.05889 9.91421 3.03157 9.97554C3.00424 10.0369 2.98954 10.1031 2.98836 10.1702C2.98717 10.2374 2.99952 10.304 3.02467 10.3663C3.04982 10.4286 3.08725 10.4851 3.13473 10.5326C3.18221 10.5801 3.23876 10.6175 3.30102 10.6426C3.36328 10.6678 3.42997 10.6801 3.4971 10.679C3.56424 10.6778 3.63045 10.6631 3.69178 10.6358C3.75311 10.6084 3.80831 10.569 3.85409 10.5199L7.50075 6.87323L9.98075 9.35323C10.0745 9.44686 10.2016 9.49946 10.3341 9.49946C10.4666 9.49946 10.5937 9.44686 10.6874 9.35323L14.8541 5.18656Z" fill="#1A1A1A"/>
      </svg>학습통계</Button>
      </CardFooter>
      <StatusBadge status={status}>{status}</StatusBadge>
      <MoreOptions onClick={toggleDeleteButton}>
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M12.25 5.83301C12.25 5.36888 12.4344 4.92376 12.7626 4.59557C13.0908 4.26738 13.5359 4.08301 14 4.08301H14.0117C14.4758 4.08301 14.9209 4.26738 15.2491 4.59557C15.5773 4.92376 15.7617 5.36888 15.7617 5.83301V5.84467C15.7617 6.3088 15.5773 6.75392 15.2491 7.08211C14.9209 7.4103 14.4758 7.59468 14.0117 7.59468H14C13.5359 7.59468 13.0908 7.4103 12.7626 7.08211C12.4344 6.75392 12.25 6.3088 12.25 5.84467V5.83301ZM12.25 13.9997C12.25 13.5355 12.4344 13.0904 12.7626 12.7622C13.0908 12.434 13.5359 12.2497 14 12.2497H14.0117C14.4758 12.2497 14.9209 12.434 15.2491 12.7622C15.5773 13.0904 15.7617 13.5355 15.7617 13.9997V14.0113C15.7617 14.4755 15.5773 14.9206 15.2491 15.2488C14.9209 15.577 14.4758 15.7613 14.0117 15.7613H14C13.5359 15.7613 13.0908 15.577 12.7626 15.2488C12.4344 14.9206 12.25 14.4755 12.25 14.0113V13.9997ZM14 20.4163C13.5359 20.4163 13.0908 20.6007 12.7626 20.9289C12.4344 21.2571 12.25 21.7022 12.25 22.1663V22.178C12.25 22.6421 12.4344 23.0873 12.7626 23.4154C13.0908 23.7436 13.5359 23.928 14 23.928H14.0117C14.4758 23.928 14.9209 23.7436 15.2491 23.4154C15.5773 23.0873 15.7617 22.6421 15.7617 22.178V22.1663C15.7617 21.7022 15.5773 21.2571 15.2491 20.9289C14.9209 20.6007 14.4758 20.4163 14.0117 20.4163H14Z" fill="#B1B1B1"/>
      </svg>
      </MoreOptions>

      <DeleteButton show={showDeleteButton} onClick={handleDelete}>
        카드 삭제
      </DeleteButton>

      {showModal && <DeleteModal onClose={cancelDelete} onConfirm={confirmDelete} />}
    </CardContainer>
  );
};

// PropTypes for Type Checking
FlashcardItem.propTypes = {
  note: PropTypes.string.isRequired,
  folder: PropTypes.string.isRequired,
  recentDate: PropTypes.string.isRequired,
  nextDate: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['학습 중', '학습 전', '영구 보관']).isRequired,
  color: PropTypes.string.isRequired,
};

export default FlashcardItem;
