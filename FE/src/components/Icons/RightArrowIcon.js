import colors from '../../constants/colors';

const RightArrowIcon = ({ isLastPage }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="20"
    viewBox="0 0 11 20"
    fill="none"
  >
    <path
      d="M2 18L10 10L2 2"
      stroke={isLastPage ? colors.greyThree : colors.black}
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </svg>
);

export default RightArrowIcon;
