import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	body {
	margin: 0;
	padding: 0;
	font-family: 'Noto Sans KR', sans-serif;
  }

  a {
    text-decoration: none;
	color: inherit;
  }
`;

export default GlobalStyle;
