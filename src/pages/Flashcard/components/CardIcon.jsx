import styled from 'styled-components';

const CardIcon = ({ color }) => (
<svg xmlns="http://www.w3.org/2000/svg" width="34" height="27" viewBox="0 0 34 27" fill="none">
  <g clipPath="url(#clip0_1387_7518)">
    <path d="M8.30711 5.98555L8.49178 5.00445L9.23047 1.08008L32.2895 5.3255L29.3348 21.023L26.4524 20.4923L25.7318 20.3597" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="1.71094" y="7.07422" width="23.375" height="18.36" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="1.71094" y="7.07422" width="23.375" height="18.36" fill={color}/>
    <line x1="7.06094" y1="14.6139" x2="19.7359" y2="14.6139" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="7.06094" y1="18.9342" x2="15.4859" y2="18.9342" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_1387_7518">
      <rect width="34" height="27" fill="white"/>
    </clipPath>
  </defs>
</svg>
);

export default CardIcon;
