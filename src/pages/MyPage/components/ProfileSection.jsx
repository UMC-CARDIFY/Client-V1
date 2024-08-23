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
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: none;
  background-color: #fff;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
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
        <ProfileImage > 
        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="103" viewBox="0 0 128 103" fill="none">
          <path d="M75.9312 102.577L23.7859 51.5496L75.4131 0L127.558 51.0184L75.9312 102.577Z" fill="#72A3FF"/>
          <path d="M52.1453 102.587L0 51.5496L51.6272 0L103.772 51.0184L52.1453 102.587Z" fill="#0F62FE"/>
          <path d="M19.0288 40.4127C26.806 40.4127 34.7382 40.0046 42.4706 40.81" stroke="white" stroke-linecap="round"/>
          <path d="M47.5718 40.4127C55.349 40.4127 63.2812 40.0046 71.0136 40.81" stroke="white" stroke-linecap="round"/>
          <path d="M24.3264 41.2079C24.3264 44.5489 24.521 47.9814 27.0488 50.4198C28.213 51.5428 30.2279 53.2598 31.9932 53.2598C33.7053 53.2598 35.5378 53.1294 37.2246 52.8699C37.9756 52.7543 38.6605 50.6491 38.7918 49.993C39.0404 48.7496 39.2921 47.5857 39.2921 46.3068C39.2921 44.3741 39.4059 42.4393 39.0272 40.5457" stroke="white" stroke-linecap="round"/>
          <path d="M52.8694 41.2079C52.8694 44.5489 53.0639 47.9814 55.5918 50.4198C56.756 51.5428 58.7708 53.2598 60.5362 53.2598C62.2483 53.2598 64.0807 53.1294 65.7675 52.8699C66.5186 52.7543 67.2035 50.6491 67.3347 49.993C67.5834 48.7496 67.8351 47.5857 67.8351 46.3068C67.8351 44.3741 67.9489 42.4393 67.5702 40.5457" stroke="white" stroke-linecap="round"/>
          <path d="M30.6835 41.4725C30.2517 43.4155 28.9885 45.2374 29.7564 47.2851C30.4015 49.0054 31.7979 48.9889 33.2734 48.3226C34.1596 47.9223 35.3667 47.453 35.9001 46.5641C36.4619 45.6277 35.7561 43.8119 35.4586 42.9293C35.2296 42.2499 34.8466 40.5612 33.7884 40.8397C32.6052 41.1511 31.5446 42.8418 31.0366 43.8123C30.6287 44.5916 30.2314 45.5303 30.3744 46.4316C30.4107 46.6599 30.5542 47.5367 30.9631 47.2557C31.89 46.6184 33.2019 45.4208 33.5971 44.3567C33.6876 44.1131 33.839 43.1733 33.8326 43.1868C33.2297 44.4679 32.7088 45.7152 32.8834 47.1821C32.9501 47.7419 33.4221 46.8538 33.4647 46.7774C33.8089 46.1598 34.0095 45.4873 33.965 44.7761C33.907 43.8481 33.6377 42.9598 32.8908 42.3701C32.2919 41.8973 31.685 43.35 31.537 43.724C31.1246 44.7656 30.9298 45.8458 31.7724 46.6671C32.9477 47.8126 34.109 47.6741 34.8774 46.1373C35.7126 44.4668 35.3228 42.0421 34.3476 40.5013C33.4823 39.1341 32.2317 41.2467 31.8607 41.8257C31.3308 42.6526 29.57 44.6756 30.1463 45.8283C30.4425 46.4207 31.8808 47.3667 32.5818 47.1453C33.9472 46.7141 34.3954 40.4149 33.1998 40.4718C33.0016 40.4813 32.6797 40.9501 32.5818 41.0605C32.0107 41.7039 31.4673 42.3785 31.0513 43.1353C30.5823 43.989 30.0714 45.0763 30.0801 46.0784C30.0846 46.5976 30.6665 46.7723 31.0661 46.9172C31.684 47.1413 32.3285 47.0259 32.6406 46.3875C32.9243 45.8073 32.9899 45.1084 33.0379 44.4745C33.0453 44.3773 33.1301 43.0375 32.9129 43.1868C32.0696 43.7666 31.721 45.1576 31.3751 46.0417C30.9473 47.1349 31.3605 46.3651 31.64 45.6958C31.9904 44.8566 32.2826 43.9928 32.6406 43.1574C32.6701 43.0886 32.7755 42.8932 32.7583 42.9661C32.7287 43.0922 32.5178 43.6516 32.5155 43.6577C32.1322 44.7194 31.8754 45.6502 31.8754 46.7701" stroke="white" stroke-linecap="round"/>
          <path d="M59.2267 41.4725C58.7949 43.4155 57.5317 45.2374 58.2996 47.2851C58.9447 49.0054 60.3411 48.9889 61.8166 48.3226C62.7028 47.9223 63.91 47.453 64.4433 46.5641C65.0051 45.6277 64.2993 43.8119 64.0019 42.9293C63.7728 42.2499 63.3899 40.5612 62.3316 40.8397C61.1484 41.1511 60.0878 42.8418 59.5798 43.8123C59.172 44.5916 58.7746 45.5303 58.9176 46.4316C58.9539 46.6599 59.0975 47.5367 59.5063 47.2557C60.4332 46.6184 61.7451 45.4208 62.1403 44.3567C62.2308 44.1131 62.3822 43.1733 62.3758 43.1868C61.7729 44.4679 61.252 45.7152 61.4266 47.1821C61.4933 47.7419 61.9653 46.8538 62.0079 46.7774C62.3521 46.1598 62.5527 45.4873 62.5082 44.7761C62.4502 43.8481 62.1809 42.9598 61.434 42.3701C60.8351 41.8973 60.2282 43.35 60.0802 43.724C59.6679 44.7656 59.473 45.8458 60.3156 46.6671C61.4909 47.8126 62.6522 47.6741 63.4206 46.1373C64.2559 44.4668 63.8661 42.0421 62.8908 40.5013C62.0255 39.1341 60.7749 41.2467 60.4039 41.8257C59.874 42.6526 58.1132 44.6756 58.6896 45.8283C58.9857 46.4207 60.424 47.3667 61.125 47.1453C62.4905 46.7141 62.9387 40.4149 61.743 40.4718C61.5448 40.4813 61.2229 40.9501 61.125 41.0605C60.5539 41.7039 60.0105 42.3785 59.5946 43.1353C59.1255 43.989 58.6146 45.0763 58.6233 46.0784C58.6279 46.5976 59.2097 46.7723 59.6093 46.9172C60.2272 47.1413 60.8717 47.0259 61.1838 46.3875C61.4675 45.8073 61.5331 45.1084 61.5812 44.4745C61.5885 44.3773 61.6733 43.0375 61.4561 43.1868C60.6129 43.7666 60.2643 45.1576 59.9183 46.0417C59.4905 47.1349 59.9037 46.3651 60.1832 45.6958C60.5336 44.8566 60.8258 43.9928 61.1838 43.1574C61.2133 43.0886 61.3187 42.8932 61.3016 42.9661C61.2719 43.0922 61.061 43.6516 61.0588 43.6577C60.6754 44.7194 60.4186 45.6502 60.4186 46.7701" stroke="white" stroke-linecap="round"/>
        </svg>
        </ProfileImage>

      </ProfileImageContainer>
      <NicknameContainer>
        <Nickname>{nickname}</Nickname>
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