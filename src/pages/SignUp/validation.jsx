export const validateName = (value) => {
    if (!value) {
      return '이름을 입력해 주세요.';
    }
    return '';
  };
  
  export const validateEmail = (value) => {
    if (!value) {
      return '이메일을 입력해 주세요.';
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      return '이메일을 올바르게 입력해 주세요.';
    }
    return '';
  };
  
  export const validateVerificationCode = (value) => {
    if (!value) {
      return '인증번호를 입력해 주세요.';
    }
    return '';
  };
  
  export const validatePassword = (value) => {
    if (!value) {
      return '비밀번호를 입력해 주세요.';
    } else if (value.length < 8) {
      return '비밀번호는 최소 8자 이상이어야 합니다.';
    } else if (value.length > 20) {
        return '비밀번호는 최대 20자 이하이어야 합니다.';
      }
    return '';
  };
  
  export const validatePasswordCheck = (password, passwordCheck) => {
    if (passwordCheck !== password) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return '';
  };