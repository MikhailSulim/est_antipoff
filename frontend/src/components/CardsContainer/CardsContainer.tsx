import { useSelector } from 'react-redux';
import { getExperts, loadMore } from '../../redux/expertsSlice';
import { useAppDispatch } from '../../redux/hooks';
import ExpertCard from '../ExpertCard/ExpertCard';
import './CardsContainer.scss';

import React, { useEffect, useRef, useState } from 'react';
import { RootState } from '../../redux/store';
import { ADD_CARDS_COUNT } from '../../utils/constants';

interface Card {
  id: number;
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
}

const CardsContainer: React.FC = () => {
  const [showCards, setShowCards] = useState<number>(ADD_CARDS_COUNT);
  const dispatch = useAppDispatch();
  const { expertsList, totalItems, currentPage, isLoadingAll } = useSelector(
    (state: RootState) => state.experts
  );

  useEffect(() => {
    if (expertsList.length === 0)
    dispatch(getExperts(1));
  }, [dispatch, expertsList.length]);

  const showMore = () => {
    setShowCards(showCards + ADD_CARDS_COUNT);
  };

  useEffect(() => {
    if (totalItems > 0)
      if (showCards > expertsList.length && !isLoadingAll) {
        dispatch(loadMore());
      }
  }, [dispatch, expertsList.length, isLoadingAll, showCards, totalItems]);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      dispatch(getExperts(currentPage));
    } else {
      isFirstRender.current = false;
    }
  }, [dispatch, currentPage]);

  return (
    <main className="container">
      <div className="container__items">
        {expertsList.slice(0, showCards).map((card: Card) => (
          <ExpertCard
            key={card.id}
            id={card.id}
            imgUrl={card.avatar}
            name={`${card.first_name} ${card.last_name}`}
          />
        ))}
      </div>
      {showCards < totalItems && (
        <button type="button" className="container__button" onClick={showMore}>
          Показать ещё
          <svg>
            <use xlinkHref="images/sprite.svg#arrow" />
          </svg>
        </button>
      )}
    </main>
  );
};

export default CardsContainer;
