import React, { useEffect } from 'react';
import Header from '../components/Header/Header';
import CardsContainer from '../components/CardsContainer/CardsContainer';
import { getExperts } from '../redux/expertsSlice';
import { useAppDispatch } from '../redux/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const MainPage = () => {
  const dispatch = useAppDispatch();
    
  useEffect(() => {
    dispatch(getExperts());
  }, [dispatch]);
  
  const experts = useSelector((state: RootState) => state.experts.expertsList);
  
  return (
    <div>
      <Header main={true} />
      <CardsContainer cards={experts} />
    </div>
  );
};

export default MainPage;
