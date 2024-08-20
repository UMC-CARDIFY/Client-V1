const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  kakao: {
    clientId: import.meta.env.VITE_KAKAO_CLIENT_ID,
    redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
  }
};

export default config;
