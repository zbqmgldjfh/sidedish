import styled from 'styled-components';

import { FONT } from '../../constants/fonts';
import CarouselProvider from '../Carousel/CarouselProvider';
import useCarousel from '../Carousel/useCarousel';
import Text from '../Text';
import FoodCards from './FoodCards';

const FOOD_PER_PAGE = 4;

const SubTitle = styled.div`
  margin: 0 80px;
`;

const SubContent = ({
  content: { detailTitle: title, itemResource: foods },
}) => {
  const maxPage = (foods && Math.ceil(foods.length / FOOD_PER_PAGE)) || 0;

  const getSlideDataByPage = (page) => {
    const startIndex = page * FOOD_PER_PAGE;
    return (
      <FoodCards
        foods={foods?.slice(startIndex, startIndex + FOOD_PER_PAGE)}
        size={FOOD_PER_PAGE}
      />
    );
  };

  const carousel = useCarousel({
    getSlideDataByPage,
    maxPage,
    buttonPrevCss: `
      top:30em;
      left:3em;
    `,
    buttonNextCss: `
      top:30em;
      right:3em;
    `,
  });

  return (
    <>
      <SubTitle>
        <Text font={FONT.XLARGE_BOLD}>{title}</Text>
      </SubTitle>
      <CarouselProvider {...carousel} />
    </>
  );
};

export default SubContent;
