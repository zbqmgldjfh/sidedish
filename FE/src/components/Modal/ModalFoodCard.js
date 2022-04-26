import { useContext } from 'react';
import styled from 'styled-components';

import colors from '../../constants/colors';
import { FONT } from '../../constants/fonts';
import modalFoods from '../../mocks/modalFoods';
import ModalInfoContextStore from '../../stores/ModalInfoStore';
import Text from '../Text';

const CardWrap = styled.li`
  padding: 10px;
`;

const CardImg = styled.img`
  width: 100%;
  margin-bottom: 8px;
`;

const CardText = styled.div`
  margin: 8px 0px;
`;

const OriginPrice = styled(Text)`
  margin-left: 8px;
  color: ${colors.greyThree};
  text-decoration: line-through;
`;

const ModalFoodCard = ({ food }) => {
  const ModalInfo = useContext(ModalInfoContextStore);

  const onCardClick = () => {
    if (ModalInfo.modalDisplay === 'none') {
      ModalInfo.setCardInfo({ ...food, ...modalFoods[food.detail_hash] });
      ModalInfo.setModalDisplay('block');
    }
  };
  return (
    <CardWrap onClick={onCardClick}>
      <CardImg src={food.image} alt={food.alt} />
      <CardText>
        <Text font={FONT.XSMALL}>{food.title}</Text>
      </CardText>
      <CardText>
        <Text font={FONT.SMALL_BOLD}>{food.s_price}</Text>
        <OriginPrice font={FONT.XSMALL}>{food.n_price}</OriginPrice>
      </CardText>
    </CardWrap>
  );
};
export default ModalFoodCard;
