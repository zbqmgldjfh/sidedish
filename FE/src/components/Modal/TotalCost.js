import { useContext } from 'react';
import styled from 'styled-components';

import colors from '../../constants/colors';
import { FONT } from '../../constants/fonts';
import ModalInfoContextStore from '../../stores/ModalInfoStore';
import Text from '../Text';

const REDUCTION_RATIO = 1.3;

const TotalCostWrap = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  width: auto;
  height: calc(30px / ${REDUCTION_RATIO});
  right: 33px;
  top: calc(337px / ${REDUCTION_RATIO});
`;

const CostWrap = styled.div`
  margin-right: 20px;
`;

const TotalCost = () => {
  const ModalInfo = useContext(ModalInfoContextStore);

  return (
    <TotalCostWrap>
      <CostWrap>
        <Text font={FONT.MEDIUM} textColor={colors.greyThree}>
          총 주문금액
        </Text>
      </CostWrap>
      <Text font={FONT.LARGE_BOLD}>{ModalInfo.cardInfo.s_price}</Text>
    </TotalCostWrap>
  );
};

export default TotalCost;
