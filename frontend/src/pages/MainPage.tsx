import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import CardsContainer from '../components/CardsContainer/CardsContainer';
import expertsApi from '../utils/expertsApi';

const MainPage = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    expertsApi.getExperts().then((cards) => setCards(cards.data));
  }, []);
  return (
    <div>
      <Header main={true} />
      <CardsContainer cards={cards} />
    </div>
  );
};

export default MainPage;
