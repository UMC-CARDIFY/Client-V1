import PropTypes from "prop-types";

const SvgIcCommonStarGrey32 = ({ fill = "none", stroke = "#B1B1B1", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={fill} 
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      stroke={stroke} 
      strokeLinejoin="round"
      d="M16.233 19.66a.5.5 0 0 0-.466 0l-4.041 2.125.772-4.5a.5.5 0 0 0-.144-.443l-3.271-3.187 4.519-.657a.5.5 0 0 0 .376-.273L16 8.629l2.021 4.095a.5.5 0 0 0 .377.274l4.519.657-3.27 3.187a.5.5 0 0 0-.144.443l.772 4.5zm-4.576 2.525Zm-2.975-8.472-.03-.198zm14.636 0Zm-2.974 8.472Z"
    />
  </svg>
);

SvgIcCommonStarGrey32.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
};

export default SvgIcCommonStarGrey32;
