import React from 'react';
import Header from '../components/Header/Header';
import CardsContainer from '../components/CardsContainer/CardsContainer';


const MainPage = () => {
  
  
  return (
    <div>
      <Header main={true} />
      <CardsContainer />
    </div>
  );
};

export default MainPage;
