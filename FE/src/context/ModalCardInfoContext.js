import { useState } from 'react';

import ModalInfoContextStore from '../stores/ModalInfoStore';

const CardInfoContext = (props) => {
  const [cardInfo, setCardInfo] = useState([]);
  const [modalDisplay, setModalDisplay] = useState('none');
  const [amount, setAmount] = useState(1);
  const [thumbImg, setThumbImg] = useState([]);
  const [topImg, setTopImg] = useState('');
  const [relatedContent, setRelatedContent] = useState([]);
  const ModalInfo = {
    cardInfo,
    modalDisplay,
    amount,
    thumbImg,
    topImg,
    relatedContent,
    setModalDisplay,
    setCardInfo,
    setAmount,
    setThumbImg,
    setTopImg,
    setRelatedContent,
  };

  return (
    <ModalInfoContextStore.Provider value={ModalInfo}>
      {props.children}
    </ModalInfoContextStore.Provider>
  );
};
export default CardInfoContext;
