/* eslint-disable array-callback-return */
import { useContext } from 'react';
import styled from 'styled-components';

import ModalInfoContextStore from '../../stores/ModalInfoStore';

const REDUCTION_RATIO = 1.3;

const ProductImgWrap = styled.div`
  width: calc(392px / ${REDUCTION_RATIO});
  height: calc(472px / ${REDUCTION_RATIO});
  position: absolute;

  left: calc(48px / ${REDUCTION_RATIO});
  top: calc(76px / ${REDUCTION_RATIO});
`;

const TopImg = styled.img`
  width: 100%;
  height: calc(392px / ${REDUCTION_RATIO});
`;

const ThumbImgWrap = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  position: absolute;
  top: calc(392px / ${REDUCTION_RATIO});
  margin-top: 7px;
  justify-content: space-between;
`;

const ThumbImg = styled.img`
  width: 55px;
  height: 55px;
`;

const FakeImg = styled.div`
  width: 55px;
  height: 55px;
`;
const ProductImg = () => {
  const ModalInfo = useContext(ModalInfoContextStore);
  const THUMB_IMAGES_LENGTH = 5;

  for (
    let i = 0;
    // eslint-disable-next-line no-unsafe-optional-chaining
    i < THUMB_IMAGES_LENGTH - ModalInfo.cardInfo?.thumb_images?.length;
    i += 1
  ) {
    ModalInfo.cardInfo.thumb_images.push(' ');
  }

  return (
    <ProductImgWrap>
      <TopImg src={ModalInfo.cardInfo.image} />
      <ThumbImgWrap>
        {ModalInfo.cardInfo?.thumb_images?.map((api, idx) => {
          if (api !== ' ') {
            return <ThumbImg key={api + idx} src={api} />;
          }
          return <FakeImg key={api + idx} />;
        })}
      </ThumbImgWrap>
    </ProductImgWrap>
  );
};

export default ProductImg;
