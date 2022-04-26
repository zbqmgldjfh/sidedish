import styled from 'styled-components';

import ModalFoodCard from './ModalFoodCard';

const CardsWrap = styled.ul`
  padding-top: 67px;
  padding-left: 15px;
  padding-right: 15px;
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.size}, 1fr)`};
`;

const ModalFoodCards = ({ foods, size }) => (
  <CardsWrap size={size}>
    {foods.map((food) => (
      <ModalFoodCard key={food.detail_hash} food={food} />
    ))}
  </CardsWrap>
);

export default ModalFoodCards;
