import styled from 'styled-components';

import colors from '../../constants/colors';
import { FONT } from '../../constants/fonts';
import Text from '../Text';

const REDUCTION_RATIO = 1.3;

const OrderButtonWrap = styled.div`
  position: absolute;
  width: calc(440px / ${REDUCTION_RATIO});
  height: calc(58px / ${REDUCTION_RATIO});
  left: calc(472px / ${REDUCTION_RATIO});
  top: calc(490px / ${REDUCTION_RATIO});
  background-color: ${colors.black};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OrderButton = () => (
  <OrderButtonWrap>
    <Text font={FONT.SMALL_TITLE} textColor={colors.white}>
      주문하기
    </Text>
  </OrderButtonWrap>
);

export default OrderButton;
