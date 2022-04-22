import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FONT } from '../../constants/fonts';
import LeftArrowIcon from '../Icons/LeftArroIcon';
import RightArrowIcon from '../Icons/RightArrowIcon';
import Text from '../Text';
import FoodCards from './FoodCards';

const SubTitle = styled.div`
  margin: 0 80px;
`;
const FoodCardsWrap = styled.div`
  display: flex;
`;
const LeftArrow = styled.div`
  margin-top: 25%;
  padding-left: 20px;
`;
const RightArrow = styled.div`
  margin-top: 25%;
  padding-right: 20px;
`;
const FoodCardsList = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;

  height: 557px;
  transform: ${(props) => `translateX(${props.pxToMove}%`};
`;
const CreateSubContent = (content, idx) => {
  const [onButtonClick, setOnButtonClick] = useState(0);
  const [distanceToMove, setDistanceToMove] = useState(0);
  const [prevOnButtonClick, setPrevOnButtonClick] = useState(onButtonClick);
  const CarouselCardsLength = Array.from(
    { length: Math.ceil(content.foods.length / 4) },
    (v, i) => i * 4,
  );

  useEffect(() => {
    if (prevOnButtonClick - onButtonClick < 0) {
      setDistanceToMove(100);
    }
  });

  return (
    <div key={content + idx}>
      <SubTitle>
        <Text font={FONT.XLARGE_BOLD}>{content.title}</Text>
      </SubTitle>
      <FoodCardsWrap>
        <LeftArrow>
          <LeftArrowIcon />
        </LeftArrow>
        <FoodCardsList pxToMove={distanceToMove}>
          {CarouselCardsLength.map((el) => (
            <FoodCards key={el} foods={content.foods.slice(el, el + 4)} />
          ))}
        </FoodCardsList>
        <RightArrow
          onClick={() => {
            setPrevOnButtonClick(onButtonClick);
            setOnButtonClick(onButtonClick + 1);
          }}
        >
          <RightArrowIcon />
        </RightArrow>
      </FoodCardsWrap>
    </div>
  );
};

const SubContents = ({ subContents }) => <div>{subContents.map(CreateSubContent)}</div>;
export default SubContents;
