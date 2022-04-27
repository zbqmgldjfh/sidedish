import { useContext, useEffect, useState } from 'react';
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
  justify-content: flex-start;
  align-items: center;
`;

const ThumbImg = styled.img`
  width: 55px;
  height: 55px;
  cursor: pointer;
  margin-right: 6.53px;
`;

const ProductImg = () => {
  const ModalInfo = useContext(ModalInfoContextStore);
  const [thumbImgInfo, setThumbImgInfo] = useState([]);
  useEffect(() => {
    ModalInfo.thumbImg.splice(thumbImgInfo.idx, 1, ModalInfo.topImg);
    ModalInfo.setThumbImg(ModalInfo.thumbImg);
    ModalInfo.setTopImg(thumbImgInfo.api);
  }, [thumbImgInfo]);

  return (
    <ProductImgWrap>
      <TopImg src={ModalInfo.topImg} />
      <ThumbImgWrap>
        {ModalInfo.thumbImg.map((api, idx) => (
          <ThumbImg
            onClick={() => {
              setThumbImgInfo({ api, idx });
            }}
            key={api + idx}
            src={api}
          />
        ))}
      </ThumbImgWrap>
    </ProductImgWrap>
  );
};

export default ProductImg;
