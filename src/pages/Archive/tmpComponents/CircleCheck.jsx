

const CircleCheck = ({ circleColor = "#5AA6C7", isSelected = false, onClick }) => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <circle cx="9" cy="9" r="9" fill={circleColor} />
      {isSelected && (
        <path
          d="M7.77578 12L4.92578 9.15005L5.63828 8.43755L7.77578 10.575L12.3633 5.98755L13.0758 6.70005L7.77578 12Z"
          fill='white'
        />
      )}
    </svg>
  );
  
  export default CircleCheck;