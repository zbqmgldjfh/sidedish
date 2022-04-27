/* eslint-disable no-unsafe-optional-chaining */
import styled from 'styled-components';

import colors from '../../constants/colors';
import { FONT } from '../../constants/fonts';
import subContents from '../../mocks/subContents';
import ModalCarouselProvider from '../Carousel/ModalCarouselProvider';
import useCarousel from '../Carousel/useCarousel';
import Text from '../Text';
import ModalFoodCards from './ModalFoodCards';

const REDUCTION_RATIO = 1.3;
const FOOD_PER_PAGE = 5;

const RelatedProductWrap = styled.div`
  position: absolute;
  width: calc(955px / ${REDUCTION_RATIO});
  height: calc(391px / ${REDUCTION_RATIO});
  top: calc(598px / ${REDUCTION_RATIO});
  background-color: ${colors.offWhite};
`;

const SubTitle = styled.div`
  position: absolute;
  top: calc(48px / ${REDUCTION_RATIO});
  left: calc(48px / ${REDUCTION_RATIO});
`;
const RelatedProduct = () => {
  const maxPage = Math.ceil(subContents[0].foods.length / FOOD_PER_PAGE);

  const getSlideDataByPage = (page) => {
    const startIndex = page * FOOD_PER_PAGE;
    return (
      <ModalFoodCards
        foods={subContents[0].foods.slice(
          startIndex,
          startIndex + FOOD_PER_PAGE,
        )}
        size={FOOD_PER_PAGE}
      />
    );
  };

  const carousel = useCarousel({
    getSlideDataByPage,
    maxPage,
    buttonPrevCss: `
      top: calc(57px / ${REDUCTION_RATIO});
      right: calc(135px / ${REDUCTION_RATIO});
    `,
    buttonNextCss: `
      top: calc(57px / ${REDUCTION_RATIO});
      right: calc(57px / ${REDUCTION_RATIO});
    `,
  });
  return (
    <RelatedProductWrap>
      <SubTitle>
        <Text font={FONT.LARGE_BOLD}>함께하면 더 맛있는 상품</Text>
      </SubTitle>
      <ModalCarouselProvider {...carousel} />
    </RelatedProductWrap>
  );
};
export default RelatedProduct;
