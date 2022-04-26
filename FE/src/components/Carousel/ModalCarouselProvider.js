import styled from 'styled-components';

import colors from '../../constants/colors';
import LeftArrowIcon from '../Icons/LeftArrowIcon';
import RightArrowIcon from '../Icons/RightArrowIcon';

const REDUCTION_RATIO = 1.3;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Slider = styled.div`
  display: flex;
  width: ${({ slidesLen }) => `${slidesLen * 100}%`};
  overflow: hidden;
  transform: ${({ curPage }) => `translateX(-${curPage * 100}%)`};
  transition: transform 1s;
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
`;

const ButtonWrap = styled.button`
  position: absolute;
  background-color: ${colors.none};
  cursor: ${({ isLastPage, isStartPage }) =>
    isLastPage || isStartPage ? 'default' : 'pointer'};
  ${({ css }) => css};
`;

const PageStatus = styled.div`
  position: absolute;
  width: calc(50px / ${REDUCTION_RATIO});
  right: calc(87px / ${REDUCTION_RATIO});
  top: calc(60px / ${REDUCTION_RATIO});
  display: flex;
  justify-content: space-between;
`;

const ButtonPrev = ({ onButtonClick, css, isStartPage, transitioning }) => (
  <ButtonWrap
    isPrev={true}
    onClick={onButtonClick}
    css={css}
    isStartPage={isStartPage}
    disabled={!!isStartPage || transitioning}
  >
    <LeftArrowIcon isStartPage={isStartPage} />
  </ButtonWrap>
);

const ButtonNext = ({ onButtonClick, css, isLastPage, transitioning }) => (
  <ButtonWrap
    isPrev={false}
    onClick={onButtonClick}
    css={css}
    isLastPage={isLastPage}
    disabled={!!isLastPage || transitioning}
  >
    <RightArrowIcon isLastPage={isLastPage} />
  </ButtonWrap>
);

const CarouselProvider = ({
  maxPage,
  curPage,
  transitioning,
  slides,
  onClickNext,
  onClickPrev,
  onTransitionEnd,
  buttonPrevCss,
  buttonNextCss,
}) => {
  const isStartPage = curPage === 0;
  const isLastPage = curPage === maxPage - 1;

  return (
    <CarouselWrapper>
      <Slider
        onTransitionEnd={onTransitionEnd}
        slidesLen={slides.length}
        maxPage={maxPage}
        curPage={curPage}
      >
        {slides.map((slide, idx) => (
          <Slide key={`slide-${idx}`}>{slide}</Slide>
        ))}
      </Slider>
      <ButtonPrev
        isStartPage={isStartPage}
        onButtonClick={onClickPrev}
        transitioning={transitioning}
        css={buttonPrevCss}
      />
      <PageStatus>
        <div>{curPage}</div>/<div>{maxPage}</div>
      </PageStatus>
      <ButtonNext
        isLastPage={isLastPage}
        onButtonClick={onClickNext}
        transitioning={transitioning}
        css={buttonNextCss}
      />
    </CarouselWrapper>
  );
};

export default CarouselProvider;
