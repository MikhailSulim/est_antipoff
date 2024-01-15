import ExpertCard from '../ExpertCard/ExpertCard';
import './CardsContainer.scss';

import React from 'react';

interface Card {
  id: number;
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface CardsContainerProps {
  cards: Card[];
}

const CardsContainer: React.FC<CardsContainerProps> = ({ cards }) => {
  
  return (
    <main className="container">
      <div className="container__items">
        {cards.map((card) => (
          <ExpertCard
            key={card.id}
            id={card.id}
            imgUrl={card.avatar}
            name={`${card.first_name} ${card.last_name}`}
          />
        ))}
      </div>
      <button type="button" className="container__button">
        Показать ещё
        <svg>
          <use xlinkHref="/images/sprite.svg#arrow" />
        </svg>
      </button>
    </main>
  );
};

export default CardsContainer;
