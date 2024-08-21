import { ModalOverlay, ModalContent, Title, Description, ButtonGroup, Button }from '../../../../components/Modal/style/DeleteModalStyles'
import deleteIcon from '../../../../../src/assets/deleteicon.svg';
import PropTypes from 'prop-types';

const LogoutModal = ({ onClose }) => {

const handleLogoutConfirm = () => {
    localStorage.removeItem('accessToken'); // 토큰 삭제
    window.location.href = '/sign-in'; // 로그인 페이지로 리다이렉트
};

return (
<ModalOverlay>
    <ModalContent>
    <Title>
        <img src={deleteIcon} alt="deleteIcon" style={{ marginRight: '0.75rem' }} />
        로그 아웃
    </Title>
    <Description>로그 아웃 하시겠습니까? </Description>
    <ButtonGroup>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleLogoutConfirm}>확인</Button>
    </ButtonGroup>
    </ModalContent>
</ModalOverlay>
);
};

LogoutModal.propTypes = {
    onClose: PropTypes.func.isRequired,
  };

export default LogoutModal;