import { Link } from 'react-router-dom';
import './ExpertCard.scss';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { addLike, removeLike } from '../../redux/expertsSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface CardProps {
  id: number;
  imgUrl: string;
  name: string;
}

const ExpertCard: React.FC<CardProps> = ({ id, imgUrl, name }) => {
  const dispatch = useAppDispatch();
  const { likedExpertsId } = useSelector((state: RootState) => state.experts);

  const isLiked = useMemo(
    () => likedExpertsId.includes(id),
    [likedExpertsId, id]
  );

  const handleLike = () => {
    if (isLiked) {
      dispatch(removeLike(id));
    } else {
      dispatch(addLike(id));
    }
  };

  const buttonClassName = useMemo(
    () => (isLiked ? 'card__like card__like_active' : 'card__like'),
    [isLiked]
  );

  return (
    <div className="card">
      <Link className="card__link" to={`/${id}`}>
        <img className="card__image" src={imgUrl} alt="фото специалиста" />
      </Link>
      <Link className="card__link" to={`/${id}`}>
        <h2 className="card__name">{name}</h2>
      </Link>
      <button className={buttonClassName} onClick={handleLike}>
        <svg>
          <use xlinkHref="images/sprite.svg#like" />
        </svg>
      </button>
    </div>
  );
};

export default ExpertCard;
