import { useState } from 'react';

import ModalInfoContextStore from '../stores/ModalInfoStore';

const CardInfoContext = (props) => {
  const [cardInfo, setCardInfo] = useState([]);
  const [modalDisplay, setModalDisplay] = useState('none');
  const [amount, setAmount] = useState(1);

  const ModalInfo = {
    cardInfo,
    modalDisplay,
    setModalDisplay,
    setCardInfo,
    amount,
    setAmount,
  };

  return (
    <ModalInfoContextStore.Provider value={ModalInfo}>
      {props.children}
    </ModalInfoContextStore.Provider>
  );
};
export default CardInfoContext;
