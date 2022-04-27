import { useContext } from 'react';
import styled from 'styled-components';

import colors from '../../constants/colors';
import { FONT } from '../../constants/fonts';
import ModalInfoContextStore from '../../stores/ModalInfoStore';
import Tag from '../Tag';
import Text from '../Text';

const REDUCTION_RATIO = 1.3;

const ProductInfoWrap = styled.div`
  position: absolute;
  width: calc(440px / ${REDUCTION_RATIO});
  height: calc(237px / ${REDUCTION_RATIO});
  left: calc(472px / ${REDUCTION_RATIO});
  top: calc(76px / ${REDUCTION_RATIO});
  border-bottom: solid 1px ${colors.greyFour};
`;

const Name = styled.div`
  position: absolute;
  width: calc(440px / ${REDUCTION_RATIO});
  height: calc(30px / ${REDUCTION_RATIO});
`;

const PrimeCost = styled.div`
  position: absolute;
  width: calc(90px / ${REDUCTION_RATIO});
  height: calc(24px / ${REDUCTION_RATIO});
  top: calc(46px / ${REDUCTION_RATIO});
`;

const BadgeAndPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: auto;
  height: calc(30px / ${REDUCTION_RATIO});
  top: calc(92px / ${REDUCTION_RATIO});
`;

const DiscountPrice = styled.div`
  margin-left: 8px;
`;

const Badge = styled.div`
  display: flex;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  width: calc(440px / ${REDUCTION_RATIO});
  height: calc(70px / ${REDUCTION_RATIO});
  top: calc(140px / ${REDUCTION_RATIO});
  border-top: solid 1px ${colors.greyFour};
`;

const Point = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: center;
  height: calc(18px / ${REDUCTION_RATIO});
`;

const InfoDetail = styled.div`
  position: absolute;
  left: 77px;
`;

const DeliveryInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 7px;
`;

const Charge = styled.div`
  display: flex;
  align-items: center;
  margin-top: 7px;
`;

const ProductInfo = () => {
  const ModalInfo = useContext(ModalInfoContextStore);

  return (
    <ProductInfoWrap>
      <Name>
        <Text font={FONT.LARGE_BOLD}>
          {ModalInfo.cardInfo.product_description}
        </Text>
      </Name>
      <PrimeCost>
        <Text font={FONT.SMALL_BOLD} textColor={colors.greyThree}>
          {ModalInfo.cardInfo.n_price}
        </Text>
      </PrimeCost>
      <BadgeAndPrice>
        <Badge>
          {ModalInfo.cardInfo?.badge?.map((badgeName, idx) => (
            <Tag key={badgeName + idx} badge={badgeName} />
          ))}
        </Badge>
        <DiscountPrice>
          <Text font={FONT.MEDIUM_XBOLD}>{ModalInfo.cardInfo.s_price?.toLocaleString()}원</Text>
        </DiscountPrice>
      </BadgeAndPrice>
      <Info>
        <Point>
          <Text font={FONT.XSMALL} textColor={colors.greyTwo}>
            적립금
          </Text>
          <InfoDetail>
            <Text font={FONT.SMALL_BOLD}>{ModalInfo.cardInfo.point}</Text>
          </InfoDetail>
        </Point>
        <DeliveryInfo>
          <Text font={FONT.XSMALL} textColor={colors.greyTwo}>
            배송정보
          </Text>
          <InfoDetail>
            <Text font={FONT.SMALL_BOLD}>
              {ModalInfo.cardInfo.delivery_info}
            </Text>
          </InfoDetail>
        </DeliveryInfo>
        <Charge>
          <Text font={FONT.XSMALL} textColor={colors.greyTwo}>
            배송비
          </Text>
          <InfoDetail>
            <Text font={FONT.SMALL_BOLD}>
              {ModalInfo.cardInfo.delivery_fee}
            </Text>
          </InfoDetail>
        </Charge>
      </Info>
    </ProductInfoWrap>
  );
};

export default ProductInfo;
