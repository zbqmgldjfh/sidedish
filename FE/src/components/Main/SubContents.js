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
const createSubContent = (content, idx) => (
  <div key={content + idx}>
    <SubTitle>
      <Text font={FONT.XLARGE_BOLD}>{content.title}</Text>
    </SubTitle>
    <FoodCardsWrap>
      <LeftArrow>
        <LeftArrowIcon />
      </LeftArrow>
      <FoodCards foods={content.foods} />
      <RightArrow>
        <RightArrowIcon />
      </RightArrow>
    </FoodCardsWrap>
  </div>
);
const SubContents = ({ subContents }) => <div>{subContents.map(createSubContent)}</div>;
export default SubContents;
