import { useContext } from 'react';
import styled from 'styled-components';

import ModalInfoContextStore from '../../stores/ModalInfoStore';

const REDUCTION_RATIO = 1.3;
const ProductInfoWrap = styled.div`
  position: absolute;
  width: calc(440px / ${REDUCTION_RATIO});
  height: calc(237px / ${REDUCTION_RATIO});
  left: calc(472px / ${REDUCTION_RATIO});
  top: calc(76px / ${REDUCTION_RATIO});
`;
const ProductInfo = () => {
  const ModalInfo = useContext(ModalInfoContextStore);

  return <ProductInfoWrap>{ModalInfo.cardInfo.image}</ProductInfoWrap>;
};

export default ProductInfo;
