import styled from 'styled-components';

import { FONT } from '../../constants/fonts';
import MinusIcon from '../Icons/MinusIcon';
import PlusIcon from '../Icons/PlusIcon';
import Text from '../Text';

const REDUCTION_RATIO = 1.3;

const TotalAmountWrap = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  justify-content: space-between;
  width: calc(88px / ${REDUCTION_RATIO});
  height: calc(26px / ${REDUCTION_RATIO});
  top: calc(339px / ${REDUCTION_RATIO});
  left: calc(472px / ${REDUCTION_RATIO});
`;

const TotalAmount = () => (
  <TotalAmountWrap>
    <MinusIcon />
    <Text font={FONT.MEDIUM_BOLD}>1</Text>
    <PlusIcon />
  </TotalAmountWrap>
);

export default TotalAmount;
