const config = {
  // 로컬 개발 환경
  apiBaseUrl: 'http://localhost:8080/api/v1',
  kakao: {
    clientId: '7150f2c7d3abb6ed45289bb918a0cd63',
    redirectUri: 'http://localhost:5173/oauth2/callback/kakao',
  },

  // 배포 환경
  // apiBaseUrl: 'http://3.37.13.40:8080/api/v1',
  // kakao: {
  //   clientId: '7150f2c7d3abb6ed45289bb918a0cd63',
  //   redirectUri: 'http://3.37.13.40:8080/oauth2/callback/kakao',
  // },
};

export default config;
