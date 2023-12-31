import styled from 'styled-components';

import colors from '../../constants/colors';
import { FONT } from '../../constants/fonts';
import Text from '../Text';

const MoreButton = styled.button`
  padding: 10px;
  border: 1px solid ${colors.greyTwo};
  cursor: pointer;
  display: ${(props) => props.display};
`;

const MoreContentButton = ({ moreButtonDisplay, onButtonClick }) => (
  <MoreButton
    display={moreButtonDisplay}
    onClick={() => {
      onButtonClick();
    }}
  >
    <Text font={FONT.LARGE} textColor={colors.greyOne}>
      모든 카테고리 보기
    </Text>
  </MoreButton>
);

export default MoreContentButton;
