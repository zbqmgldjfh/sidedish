import { useContext } from 'react';
import styled from 'styled-components';

import { FONT } from '../../constants/fonts';
import ModalInfoContextStore from '../../stores/ModalInfoStore';
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

const IconWrap = styled.button`
  background-color: white;
`;
const TotalAmount = () => {
  const ModalInfo = useContext(ModalInfoContextStore);

  const onMinusBtnClick = () => {
    if (ModalInfo.amount > 0) {
      ModalInfo.setAmount(ModalInfo.amount - 1);
    }
  };

  const onPlusBtnClick = () => {
    ModalInfo.setAmount(ModalInfo.amount + 1);
  };

  return (
    <TotalAmountWrap>
    <IconWrap onClick={onMinusBtnClick}>
      <MinusIcon />
    </IconWrap>
    <Text font={FONT.MEDIUM_BOLD}>{ModalInfo.amount}</Text>
    <IconWrap onClick={onPlusBtnClick}>
      <PlusIcon />
    </IconWrap>
  </TotalAmountWrap>
  );
};

export default TotalAmount;
