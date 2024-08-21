import styled from 'styled-components';
import editNickname from '../../../assets/editNickname.svg';
import editprofileImage from '../../../assets/editprofileImage.svg';
import PropTypes from 'prop-types';

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 26.875rem;
  flex-shrink: 0;
  border: none;
  border-radius: 0.625rem;
  background: #F8F8F8;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 12.9375rem;
  height: 12.9375rem;
  margin-top: 2rem;
`;

const ProfileImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: none;
  background-color: #b1b1b1;
  flex-shrink: 0;
`;

const EditImageIcon = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 2.5rem;
  height: 2.5625rem;
  flex-shrink: 0;
  border-radius: var(--line-height-2xs, 1.25rem);
  border: 1px solid var(--B1B1B1, #B1B1B1);
  background: #ccc;
  cursor: pointer;
`;

const NicknameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 1.87rem 0 0.81rem 0;
`;

const Nickname = styled.span`
  color: #1A1A1A;
  font-family: Pretendard;
  font-size: 1.5625rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-left: 1.5rem;
`;

const Email = styled.span`
  color: #1A1A1A;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const ProfileSection = ({ nickname, email }) => {
  return (
    <SectionContainer>
      <ProfileImageContainer>
        <ProfileImage />
        <EditImageIcon>
          <img src={editprofileImage} alt="editprofileImage" />
        </EditImageIcon>
      </ProfileImageContainer>
      <NicknameContainer>
        <Nickname>{nickname}</Nickname>
          <img src={editNickname} alt="editNickname" />
      </NicknameContainer>
      <Email>{email}</Email>
    </SectionContainer>
  );
};

ProfileSection.propTypes = {
  nickname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
}

export default ProfileSection;