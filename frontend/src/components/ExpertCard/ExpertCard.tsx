import './ExpertCard.scss';
import React from 'react';

interface CardProps {
  imgUrl: string;
  name: string;
  isLiked: boolean;
}

const ExpertCard: React.FC<CardProps> = ({ imgUrl, name, isLiked }) => {
  return (
    <div className="card">
      <img className="card__image" src={imgUrl} alt="фото специалиста" />
      <h2 className="card__name">{name}</h2>
      <button className={`card__like ${isLiked && 'card__like_active'}`}>
        <svg>
          <use xlinkHref="/images/sprite.svg#like" />
        </svg>
      </button>
    </div>
  );
};

export default ExpertCard;
